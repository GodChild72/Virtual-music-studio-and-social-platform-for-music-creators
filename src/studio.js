// Minimal multi-track recorder + simple mixdown to WAV
// Features:
// - Record multiple takes (each becomes a track)
// - Per-track playback, volume, pan controls
// - Download per-track or mixdown to single WAV file

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const mixdownBtn = document.getElementById('mixdownBtn');
const tracksEl = document.getElementById('tracks');
const downloadsList = document.getElementById('downloadsList');

let mediaStream = null;
let mediaRecorder = null;
let chunks = [];
let trackCounter = 0;
let audioContext = null;
let trackNodes = []; // {buffer, gainNode, panNode, source}

async function ensureAudioContext(){
  if(!audioContext){
    audioContext = new (window.AudioContext||window.webkitAudioContext)();
  }
  return audioContext;
}

startBtn.addEventListener('click', async ()=>{
  startBtn.disabled = true;
  stopBtn.disabled = false;
  try{
    mediaStream = await navigator.mediaDevices.getUserMedia({audio:true});
  }catch(err){
    alert('Microphone access denied or not available');
    startBtn.disabled = false;
    stopBtn.disabled = true;
    return;
  }
  mediaRecorder = new MediaRecorder(mediaStream);
  chunks = [];
  mediaRecorder.ondataavailable = e => { if(e.data && e.data.size>0) chunks.push(e.data); };
  mediaRecorder.onstop = async ()=>{
    const blob = new Blob(chunks,{type:'audio/webm'});
    const arrayBuffer = await blob.arrayBuffer();
    const ac = await ensureAudioContext();
    const audioBuffer = await ac.decodeAudioData(arrayBuffer.slice(0));
    addTrack(audioBuffer, blob);
    mediaStream.getTracks().forEach(t=>t.stop());
    mediaStream = null;
    mediaRecorder = null;
  };
  mediaRecorder.start();
});

stopBtn.addEventListener('click', ()=>{
  stopBtn.disabled = true;
  startBtn.disabled = false;
  mixdownBtn.disabled = false;
  if(mediaRecorder && mediaRecorder.state!=='inactive') mediaRecorder.stop();
});

function addTrack(audioBuffer, blob){
  trackCounter += 1;
  const id = `track-${trackCounter}`;
  const track = document.createElement('div');
  track.className = 'track';
  track.id = id;

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.innerHTML = `<strong>Track ${trackCounter}</strong><div class="duration">${formatTime(audioBuffer.duration)}</div>`;

  const controls = document.createElement('div');
  controls.className = 'controls';

  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play';

  const stopPlayBtn = document.createElement('button');
  stopPlayBtn.textContent = 'Stop';
  stopPlayBtn.disabled = true;

  const vol = document.createElement('input');
  vol.type = 'range';
  vol.min = 0; vol.max = 2; vol.step = 0.01; vol.value = 1; vol.className='slider';

  const pan = document.createElement('input');
  pan.type = 'range'; pan.min = -1; pan.max = 1; pan.step = 0.01; pan.value = 0; pan.className='slider';

  const downloadBtn = document.createElement('button');
  downloadBtn.textContent = 'Download';

  controls.append(playBtn, stopPlayBtn, vol, pan, downloadBtn);
  track.append(meta, controls);
  tracksEl.appendChild(track);

  // store nodes
  trackNodes.push({id, buffer:audioBuffer, blob, volEl:vol, panEl:pan, playBtn, stopPlayBtn, downloadBtn});

  playBtn.addEventListener('click', ()=>playTrack(id));
  stopPlayBtn.addEventListener('click', ()=>stopTrack(id));
  downloadBtn.addEventListener('click', ()=>downloadTrack(id));
}

function formatTime(sec){
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

async function playTrack(id){
  const tn = trackNodes.find(t=>t.id===id);
  if(!tn) return;
  const ac = await ensureAudioContext();
  const source = ac.createBufferSource();
  source.buffer = tn.buffer;
  const gain = ac.createGain(); gain.gain.value = parseFloat(tn.volEl.value);
  const pan = (typeof ac.createStereoPanner==='function')?ac.createStereoPanner():null;
  if(pan) pan.pan.value = parseFloat(tn.panEl.value);

  if(pan) source.connect(gain).connect(pan).connect(ac.destination);
  else source.connect(gain).connect(ac.destination);
  source.start();
  tn.source = source;
  tn.stopBtn = ()=>{ try{ source.stop(); }catch(e){} };
  tn.playBtn.disabled = true;
  tn.stopPlayBtn.disabled = false;

  source.onended = ()=>{
    tn.playBtn.disabled = false;
    tn.stopPlayBtn.disabled = true;
    tn.source = null;
  };
}

function stopTrack(id){
  const tn = trackNodes.find(t=>t.id===id);
  if(!tn || !tn.source) return;
  try{ tn.stopBtn(); }catch(e){}
}

function downloadTrack(id){
  const tn = trackNodes.find(t=>t.id===id);
  if(!tn) return;
  const url = URL.createObjectURL(tn.blob);
  const a = document.createElement('a');
  a.href = url; a.download = `track-${id}.webm`;
  a.click();
  URL.revokeObjectURL(url);
}

// Mixdown: render all tracks into an offline AudioContext, then export WAV
mixdownBtn.addEventListener('click', async ()=>{
  mixdownBtn.disabled = true;
  const ac = await ensureAudioContext();
  const sampleRate = ac.sampleRate;
  const maxLen = trackNodes.reduce((m,t)=>Math.max(m, t.buffer.length),0);

  // create offline context
  const offline = new OfflineAudioContext(2, maxLen, sampleRate);

  trackNodes.forEach(t=>{
    const src = offline.createBufferSource();
    src.buffer = t.buffer;
    const gain = offline.createGain(); gain.gain.value = parseFloat(t.volEl.value);
    const pan = (typeof offline.createStereoPanner==='function')?offline.createStereoPanner():null;
    if(pan) pan.pan.value = parseFloat(t.panEl.value);
    if(pan) src.connect(gain).connect(pan).connect(offline.destination);
    else src.connect(gain).connect(offline.destination);
    src.start(0);
  });

  const rendered = await offline.startRendering();
  const wav = audioBufferToWav(rendered);
  const blob = new Blob([wav],{type:'audio/wav'});
  const url = URL.createObjectURL(blob);
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = url; a.download = 'mixdown.wav'; a.textContent = 'mixdown.wav';
  li.appendChild(a);
  downloadsList.appendChild(li);
  mixdownBtn.disabled = false;
});

// helper: convert AudioBuffer -> WAV (16-bit PCM)
function audioBufferToWav(buffer, opt) {
  opt = opt || {}
  var numChannels = buffer.numberOfChannels
  var sampleRate = buffer.sampleRate
  var format = opt.float32 ? 3 : 1
  var bitDepth = format === 3 ? 32 : 16

  var result
  if (numChannels === 2) {
    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1))
  } else {
    result = buffer.getChannelData(0)
  }

  return encodeWAV(result, numChannels, sampleRate, bitDepth)
}

function interleave(inputL, inputR){
  var length = inputL.length + inputR.length
  var result = new Float32Array(length)
  var index = 0
  var inputIndex = 0
  while (index < length) {
    result[index++] = inputL[inputIndex]
    result[index++] = inputR[inputIndex]
    inputIndex++
  }
  return result
}

function encodeWAV(samples, numChannels, sampleRate, bitDepth) {
  var bytesPerSample = bitDepth / 8
  var blockAlign = numChannels * bytesPerSample

  var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample)
  var view = new DataView(buffer)

  /* RIFF identifier */
  writeString(view, 0, 'RIFF')
  /* file length */
  view.setUint32(4, 36 + samples.length * bytesPerSample, true)
  /* RIFF type */
  writeString(view, 8, 'WAVE')
  /* format chunk identifier */
  writeString(view, 12, 'fmt ')
  /* format chunk length */
  view.setUint32(16, 16, true)
  /* sample format (raw) */
  view.setUint16(20, 1, true)
  /* channel count */
  view.setUint16(22, numChannels, true)
  /* sample rate */
  view.setUint32(24, sampleRate, true)
  /* byte rate (sampleRate * blockAlign) */
  view.setUint32(28, sampleRate * blockAlign, true)
  /* block align (channelCount * bytesPerSample) */
  view.setUint16(32, blockAlign, true)
  /* bits per sample */
  view.setUint16(34, bitDepth, true)
  /* data chunk identifier */
  writeString(view, 36, 'data')
  /* data chunk length */
  view.setUint32(40, samples.length * bytesPerSample, true)

  if (bitDepth === 16) {
    floatTo16BitPCM(view, 44, samples)
  } else {
    writeFloat32(view, 44, samples)
  }

  return view
}

function floatTo16BitPCM(output, offset, input){
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]))
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
  }
}

function writeFloat32(output, offset, input){
  for (var i = 0; i < input.length; i++, offset += 4) {
    output.setFloat32(offset, input[i], true)
  }
}

function writeString(view, offset, string){
  for (var i = 0; i < string.length; i++){
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}
