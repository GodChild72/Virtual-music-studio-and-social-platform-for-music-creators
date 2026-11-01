const soundBank = [
  { id: 'heavybass', name: 'Heavy Sub Bass', type: 'Bass' },
  { id: 'lead', name: 'Analog Lead', type: 'Lead' },
  { id: 'pad', name: 'Ambient Pad', type: 'Pad' },
  { id: 'epiano', name: 'Classic EP', type: 'Keys' },
  { id: 'kick', name: 'Punch Kick', type: 'Drum' },
  { id: 'snare', name: 'Crack Snare', type: 'Drum' },
  { id: 'bongo', name: 'Bongo Rush', type: 'Percussion' },
  { id: 'tom', name: 'Tom Depth', type: 'Percussion' }
];

const state = {
  tracks: [],
  bpm: 110,
  patternTimer: null,
  currentStep: 0,
  pattern: {
    kick: [1,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0],
    snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    hihat: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    bongo: [0,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0],
    tom: [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
    clap: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
  },
  audioCtx: null,
  masterGain: null,
  instrumentGain: null,
  instrumentDest: null,
  mediaRecorder: null,
  micStream: null,
  micChunks: [],
  instrumentRecorder: null,
  instrumentChunks: [],
  isRecording: false,
  isPlayingPattern: false,
  recordInstruments: false,
};

const elements = {
  trackList: document.getElementById('trackList'),
  trackCount: document.getElementById('trackCount'),
  qualityLabel: document.getElementById('qualityLabel'),
  statusPill: document.getElementById('statusPill'),
  runtimeLabel: document.getElementById('runtimeLabel'),
  masterMeter: document.getElementById('masterMeter'),
  soundBankList: document.getElementById('soundBankList'),
  sequencing: document.getElementById('sequencer'),
  drums: document.getElementById('drumPads'),
  bpmInput: document.getElementById('bpmInput'),
  presetSelect: document.getElementById('presetSelect'),
  recordInstruments: document.getElementById('recordInstruments'),
  qualitySelect: document.getElementById('qualitySelect'),
  audioUpload: document.getElementById('audioUpload'),
  keyboard: document.getElementById('keyboard'),
  recordBtn: document.getElementById('recordBtn'),
  recordMicBtn: document.getElementById('recordMicBtn'),
  exportBtn: document.getElementById('exportBtn'),
  playPatternBtn: document.getElementById('playPatternBtn'),
  stopPatternBtn: document.getElementById('stopPatternBtn'),
  loadSoundBankBtn: document.getElementById('loadSoundBankBtn'),
  clearSessionBtn: document.getElementById('clearSessionBtn'),
  stopPlaybackBtn: document.getElementById('stopPlaybackBtn'),
  pauseBtn: document.getElementById('pauseBtn'),
  enterStudioBtn: document.getElementById('enterStudioBtn'),
};

function ensureAudio() {
  if (state.audioCtx) return state.audioCtx;

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0.98;
  master.connect(ctx.destination);

  const instrumentGain = ctx.createGain();
  instrumentGain.gain.value = 1;
  instrumentGain.connect(master);

  const dest = ctx.createMediaStreamDestination();
  instrumentGain.connect(dest);

  state.audioCtx = ctx;
  state.masterGain = master;
  state.instrumentGain = instrumentGain;
  state.instrumentDest = dest;

  return ctx;
}

async function resumeAudio() {
  const ctx = ensureAudio();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}

function setStatus(text) {
  elements.statusPill.textContent = text;
}

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(total / 60)).padStart(2, '0');
  const secs = String(total % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
}

let sessionStart = 0;
let sessionTimer = null;

function updateRuntime() {
  if (!sessionStart) {
    elements.runtimeLabel.textContent = '00:00';
    return;
  }
  const elapsed = (Date.now() - sessionStart) / 1000;
  elements.runtimeLabel.textContent = formatTime(elapsed);
}

function startSessionTimer() {
  if (sessionTimer) return;
  sessionStart = Date.now();
  sessionTimer = setInterval(updateRuntime, 250);
  updateRuntime();
}

function stopSessionTimer() {
  if (sessionTimer) {
    clearInterval(sessionTimer);
    sessionTimer = null;
  }
  sessionStart = 0;
  updateRuntime();
}

function renderTrackCount() {
  elements.trackCount.textContent = String(state.tracks.length);
}

function buildSoundBank() {
  elements.soundBankList.innerHTML = soundBank.map(item => `
    <button class="sound-bank-item" data-sound="${item.id}" type="button">
      <div>
        <div class="sound-bank-name">${item.name}</div>
        <div class="sound-bank-tag">${item.type}</div>
      </div>
      <span class="sound-bank-tag">Play</span>
    </button>
  `).join('');

  elements.soundBankList.querySelectorAll('[data-sound]').forEach(button => {
    button.addEventListener('click', async () => {
      await resumeAudio();
      const id = button.dataset.sound;
      if (id === 'heavybass') playHeavyBass();
      else if (id === 'lead') playLead();
      else if (id === 'pad') playPad();
      else if (id === 'epiano') playEPiano();
      else if (id === 'kick') playKick();
      else if (id === 'snare') playSnare();
      else if (id === 'bongo') playBongo();
      else if (id === 'tom') playTom();
    });
  });
}

function createWaveformData(audioBuffer, points = 120) {
  const channelData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(channelData.length / points);
  const values = [];

  for (let i = 0; i < points; i++) {
    let sum = 0;
    let count = 0;
    const start = i * blockSize;
    const end = Math.min(start + blockSize, channelData.length);
    for (let j = start; j < end; j++) {
      sum += Math.abs(channelData[j]);
      count++;
    }
    values.push(count ? sum / count : 0.04);
  }

  return values;
}

function drawWaveform(canvas, values) {
  const ctx = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth * ratio;
  const height = canvas.clientHeight * ratio;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  const mid = height / 2;
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#8b5cf6');
  gradient.addColorStop(0.5, '#4f8cff');
  gradient.addColorStop(1, '#2dd6a7');

  values.forEach((value, index) => {
    const x = (index / values.length) * width;
    const barWidth = Math.max(2, width / values.length * 0.8);
    const barHeight = Math.max(3, (value || 0.04) * height * 1.8);
    ctx.fillStyle = gradient;
    ctx.fillRect(x, mid - barHeight / 2, barWidth, barHeight);
  });

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, mid, width, 1);
}

async function decodeTrackWaveform(track) {
  if (track.waveform && track.waveform.length) return track.waveform;

  try {
    if (!track.blob) return [];
    const buffer = await track.blob.arrayBuffer();
    const ctx = ensureAudio();
    const decoded = await ctx.decodeAudioData(buffer.slice(0));
    const waveform = createWaveformData(decoded, 120);
    track.waveform = waveform;
    return waveform;
  } catch (err) {
    console.warn('Could not decode waveform', err);
    return Array.from({ length: 100 }, (_, i) => 0.12 + (i % 6) * 0.014);
  }
}

function addTrackFromBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const track = {
    id: `track-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: filename,
    blob,
    url,
    volume: 1,
    pan: 0,
    muted: false,
    solo: false,
    waveform: [],
    duration: 0,
  };

  state.tracks.unshift(track);
  renderTracks();
  renderTrackCount();
  startSessionTimer();

  decodeTrackWaveform(track).then(() => renderTracks());
}

function addTrackFromFile(file) {
  if (!file || !file.type.startsWith('audio/')) return;
  addTrackFromBlob(file, file.name || 'audio-track');
}

function clearTracks() {
  state.tracks.forEach(track => URL.revokeObjectURL(track.url));
  state.tracks = [];
  renderTracks();
  renderTrackCount();
  stopSessionTimer();
  setStatus('Session cleared');
}

function renderTracks() {
  if (!state.tracks.length) {
    elements.trackList.innerHTML = '<div class="empty-state">Your session is empty. Record or import a track to begin.</div>';
    return;
  }

  elements.trackList.innerHTML = state.tracks.map(track => {
    const duration = Number.isFinite(track.duration) && track.duration > 0 ? formatTime(track.duration) : '00:00';
    return `
      <div class="track-item" data-id="${track.id}">
        <div class="track-meta">
          <div class="track-head">
            <div class="track-name">${escapeHtml(track.name)}</div>
            <div class="chip">${duration}</div>
          </div>
          <div class="track-tag-row">
            <span class="track-tag ${track.muted ? '' : 'live'}">${track.muted ? 'Muted' : 'Live'}</span>
            <span class="track-tag">Gain ${track.volume.toFixed(2)}x</span>
            <span class="track-tag">Pan ${track.pan > 0 ? '+' : ''}${track.pan.toFixed(2)}</span>
          </div>

          <div class="waveform-wrap">
            <canvas class="waveform" data-waveform-id="${track.id}"></canvas>
          </div>

          <audio controls preload="metadata" src="${track.url}"></audio>
        </div>

        <div class="track-controls">
          <div class="slider-row">
            <span>Vol</span>
            <input type="range" min="0" max="1.8" step="0.01" value="${track.volume}" data-role="volume" data-id="${track.id}" />
            <span>${track.volume.toFixed(2)}</span>
          </div>

          <div class="slider-row">
            <span>Pan</span>
            <input type="range" min="-1" max="1" step="0.01" value="${track.pan}" data-role="pan" data-id="${track.id}" />
            <span>${track.pan > 0 ? '+' : ''}${track.pan.toFixed(2)}</span>
          </div>

          <div class="track-actions">
            <button class="mini-btn ${track.muted ? '' : ''}" data-role="mute" data-id="${track.id}">${track.muted ? 'Unmute' : 'Mute'}</button>
            <button class="mini-btn" data-role="solo" data-id="${track.id}">${track.solo ? 'Solo On' : 'Solo'}</button>
            <button class="mini-btn danger" data-role="delete" data-id="${track.id}">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('canvas[data-waveform-id]').forEach(canvas => {
    const id = canvas.dataset.waveformId;
    const track = state.tracks.find(entry => entry.id === id);
    const values = track && track.waveform && track.waveform.length ? track.waveform : Array.from({ length: 80 }, (_, i) => 0.12 + (i % 6) * 0.012);
    drawWaveform(canvas, values);
  });

  document.querySelectorAll('[data-role="volume"]').forEach(input => {
    input.addEventListener('input', event => {
      const id = event.target.dataset.id;
      const track = state.tracks.find(item => item.id === id);
      if (!track) return;
      track.volume = Number(event.target.value);
      const audio = elements.trackList.querySelector(`audio[src="${track.url}"]`);
      if (audio) audio.volume = track.muted ? 0 : track.volume;
      renderTracks();
    });
  });

  document.querySelectorAll('[data-role="pan"]').forEach(input => {
    input.addEventListener('input', event => {
      const id = event.target.dataset.id;
      const track = state.tracks.find(item => item.id === id);
      if (!track) return;
      track.pan = Number(event.target.value);
      renderTracks();
    });
  });

  document.querySelectorAll('[data-role="mute"]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const track = state.tracks.find(item => item.id === id);
      if (!track) return;
      track.muted = !track.muted;
      const audio = elements.trackList.querySelector(`audio[src="${track.url}"]`);
      if (audio) audio.volume = track.muted ? 0 : track.volume;
      renderTracks();
    });
  });

  document.querySelectorAll('[data-role="solo"]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const track = state.tracks.find(item => item.id === id);
      if (!track) return;
      track.solo = !track.solo;
      renderTracks();
    });
  });

  document.querySelectorAll('[data-role="delete"]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const index = state.tracks.findIndex(item => item.id === id);
      if (index < 0) return;
      const [track] = state.tracks.splice(index, 1);
      if (track) URL.revokeObjectURL(track.url);
      renderTracks();
      renderTrackCount();
      if (!state.tracks.length) stopSessionTimer();
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function noteToFrequency(note) {
  const map = { C:0, 'C#':1, D:2, 'D#':3, E:4, F:5, 'F#':6, G:7, 'G#':8, A:9, 'A#':10, B:11 };
  const match = note.match(/([A-G]#?)(\d)/);
  if (!match) return 220;

  const letter = match[1];
  const octave = Number(match[2]);
  const midi = (octave + 1) * 12 + map[letter];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function playSynth(freq, preset = 'heavybass') {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const oscA = ctx.createOscillator();
  const oscB = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  oscA.type = preset === 'lead' ? 'sawtooth' : preset === 'epiano' ? 'triangle' : 'sawtooth';
  oscB.type = preset === 'pad' ? 'triangle' : 'sine';
  oscA.frequency.value = freq;
  oscB.frequency.value = freq * (preset === 'heavybass' ? 0.5 : 1.0);
  filter.type = 'lowpass';
  filter.frequency.value = preset === 'heavybass' ? 900 : preset === 'lead' ? 5200 : preset === 'pad' ? 1700 : 2300;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(preset === 'heavybass' ? 0.9 : preset === 'lead' ? 0.65 : preset === 'pad' ? 0.4 : 0.5, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (preset === 'pad' ? 1.8 : 0.6));

  oscA.connect(filter); oscB.connect(filter); filter.connect(gain); gain.connect(state.instrumentGain);
  oscA.start(now); oscB.start(now);
  oscA.stop(now + (preset === 'pad' ? 1.8 : 0.7));
  oscB.stop(now + (preset === 'pad' ? 1.8 : 0.7));
}

function playKick() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(42, now + 0.35);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  osc.connect(gain);
  gain.connect(state.instrumentGain);
  osc.start(now);
  osc.stop(now + 0.48);
}

function playSnare() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.22, ctx.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < channel.length; i++) channel[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(state.instrumentGain);
  source.start(now);
  source.stop(now + 0.2);
}

function playHiHat() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < channel.length; i++) channel[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 7000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.6, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(state.instrumentGain);
  source.start(now);
  source.stop(now + 0.08);
}

function playBongo() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
  gain.gain.setValueAtTime(0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
  osc.connect(gain);
  gain.connect(state.instrumentGain);
  osc.start(now);
  osc.stop(now + 0.3);
}

function playTom() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.28);
  gain.gain.setValueAtTime(0.9, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  osc.connect(gain);
  gain.connect(state.instrumentGain);
  osc.start(now);
  osc.stop(now + 0.52);
}

function playClap() {
  playSnare();
  setTimeout(() => playSnare(), 40);
}

function playHeavyBass() {
  playSynth(46, 'heavybass', 0.8);
}

function playLead() {
  playSynth(220, 'lead', 0.5);
}

function playPad() {
  playSynth(164.81, 'pad', 1.4);
}

function playEPiano() {
  playSynth(220, 'epiano', 0.55);
}

function triggerDrum(drum) {
  switch (drum) {
    case 'kick': return playKick();
    case 'snare': return playSnare();
    case 'hihat': return playHiHat();
    case 'bongo': return playBongo();
    case 'tom': return playTom();
    case 'clap': return playClap();
    default: return;
  }
}

function buildSequencer() {
  elements.sequencing.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'step-button';
    button.textContent = String(i + 1);
    button.dataset.index = String(i);
    button.addEventListener('click', () => {
      const selectedDrum = document.querySelector('.drum-pad.active')?.dataset.drum || 'kick';
      const isActive = button.classList.contains('active');
      button.classList.toggle('active', !isActive);
      button.dataset.drum = selectedDrum;
      state.pattern[selectedDrum][i] = isActive ? 0 : 1;
    });
    elements.sequencing.appendChild(button);
  }
}

function playPattern() {
  if (state.isPlayingPattern) return;

  state.isPlayingPattern = true;
  state.currentStep = 0;
  const intervalMs = (60 / Number(elements.bpmInput.value || 110)) / 2 * 1000;

  state.patternTimer = setInterval(() => {
    const stepButtons = document.querySelectorAll('.step-button');
    stepButtons.forEach(button => button.classList.remove('active-highlight'));
    const current = stepButtons[state.currentStep];
    if (current) current.classList.add('active-highlight');

    Object.entries(state.pattern).forEach(([drum, steps]) => {
      if (steps[state.currentStep]) {
        triggerDrum(drum);
      }
    });

    state.currentStep = (state.currentStep + 1) % 16;
  }, intervalMs);
}

function stopPattern() {
  state.isPlayingPattern = false;
  if (state.patternTimer) {
    clearInterval(state.patternTimer);
    state.patternTimer = null;
  }
  document.querySelectorAll('.step-button').forEach(button => button.classList.remove('active-highlight'));
}

function buildKeyboard() {
  const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];

  notes.forEach(note => {
    const key = document.createElement('button');
    key.type = 'button';
    key.className = `keyboard-key ${note.includes('#') ? 'black' : 'white'}`;
    key.textContent = note.replace(/\d/g, '');
    key.addEventListener('pointerdown', async () => {
      await resumeAudio();
      const preset = elements.presetSelect.value;
      playSynth(noteToFrequency(note), preset);
    });
    elements.keyboard.appendChild(key);
  });
}

async function startMicRecording() {
  await resumeAudio();
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Microphone capture is not supported in this browser.');
    return;
  }

  try {
    state.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mediaRecorder = new MediaRecorder(state.micStream);
    state.micChunks = [];

    state.mediaRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) state.micChunks.push(event.data);
    };

    state.mediaRecorder.onstop = () => {
      if (state.micChunks.length) {
        const blob = new Blob(state.micChunks, { type: state.micChunks[0].type || 'audio/webm' });
        addTrackFromBlob(blob, `mic-${new Date().toISOString().replace(/[:.]/g, '-')}.webm`);
      }
      state.micChunks = [];
    };

    state.mediaRecorder.start();
    state.isRecording = true;
    setStatus('Recording');
    startSessionTimer();

    if (elements.recordInstruments.checked) {
      startInstrumentRecorder();
    }

    elements.recordBtn.textContent = 'Stop Recording';
    elements.recordMicBtn.textContent = 'Stop';
  } catch (error) {
    console.error(error);
    alert('Microphone access was denied or is unavailable.');
  }
}

function stopMicRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    state.mediaRecorder.stop();
  }

  if (state.instrumentRecorder && state.instrumentRecorder.state !== 'inactive') {
    state.instrumentRecorder.stop();
  }

  if (state.micStream) {
    state.micStream.getTracks().forEach(track => track.stop());
    state.micStream = null;
  }

  state.isRecording = false;
  setStatus('Ready');
  elements.recordBtn.textContent = 'Start Recording';
  elements.recordMicBtn.textContent = 'Record';
}

function startInstrumentRecorder() {
  if (!state.instrumentDest) return;

  state.instrumentRecorder = new MediaRecorder(state.instrumentDest.stream);
  state.instrumentChunks = [];
  state.instrumentRecorder.ondataavailable = event => {
    if (event.data && event.data.size > 0) state.instrumentChunks.push(event.data);
  };

  state.instrumentRecorder.onstop = () => {
    if (state.instrumentChunks.length) {
      const blob = new Blob(state.instrumentChunks, { type: state.instrumentChunks[0].type || 'audio/webm' });
      addTrackFromBlob(blob, `instrument-${new Date().toISOString().replace(/[:.]/g, '-')}.webm`);
    }
    state.instrumentChunks = [];
  };

  state.instrumentRecorder.start();
}

async function exportMixdown() {
  if (!state.tracks.length) {
    alert('Add at least one audio track before exporting.');
    return;
  }

  const sampleRate = Number(elements.qualitySelect.value || 48000);
  const ctx = ensureAudio();

  const offline = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, sampleRate * 60 * 2, sampleRate);

  for (const track of state.tracks) {
    if (!track.blob) continue;
    try {
      const arrayBuffer = await track.blob.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
      const source = offline.createBufferSource();
      source.buffer = decoded;
      const gain = offline.createGain();
      gain.gain.value = track.muted ? 0 : track.volume;
      source.connect(gain);
      gain.connect(offline.destination);
      source.start(0);
    } catch (err) {
      console.warn('Track export failed', track.name, err);
    }
  }

  const rendered = await offline.startRendering();
  const wav = audioBufferToWav(rendered, 24);
  const url = URL.createObjectURL(wav);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'studio-pro-mix.wav';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function audioBufferToWav(audioBuffer, bitDepth = 24) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataLength = length * blockAlign;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);

  let offset = 44;
  const channelData = Array.from({ length: numChannels }, (_, ch) => audioBuffer.getChannelData(ch));

  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channelData[ch][i];
      sample = Math.max(-1, Math.min(1, sample));
      let intValue;
      if (bitDepth === 16) {
        intValue = Math.round(sample < 0 ? sample * 0x8000 : sample * 0x7fff);
        view.setInt16(offset, intValue, true);
        offset += 2;
      } else {
        intValue = Math.round(sample < 0 ? sample * 0x800000 : sample * 0x7fffff);
        view.setUint8(offset, intValue & 0xff);
        view.setUint8(offset + 1, (intValue >> 8) & 0xff);
        view.setUint8(offset + 2, (intValue >> 16) & 0xff);
        offset += 3;
      }
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function toggleRecord() {
  if (state.isRecording) {
    stopMicRecording();
  } else {
    startMicRecording();
  }
}

function stopAllPlayback() {
  document.querySelectorAll('audio').forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function setQualityLabel() {
  const value = elements.qualitySelect.value;
  const map = {
    '22050': '22.05kHz',
    '44100': '44.1kHz',
    '48000': '48kHz',
    '96000': '96kHz',
  };
  elements.qualityLabel.textContent = map[value] || '48kHz';
}

function bindControls() {
  elements.recordBtn.addEventListener('click', toggleRecord);
  elements.recordMicBtn.addEventListener('click', toggleRecord);
  elements.exportBtn.addEventListener('click', exportMixdown);
  elements.loadSoundBankBtn.addEventListener('click', () => {
    buildSoundBank();
    setStatus('Sound bank loaded');
  });
  elements.clearSessionBtn.addEventListener('click', clearTracks);
  elements.stopPlaybackBtn.addEventListener('click', stopAllPlayback);
  elements.playPatternBtn.addEventListener('click', playPattern);
  elements.stopPatternBtn.addEventListener('click', stopPattern);
  elements.enterStudioBtn.addEventListener('click', () => {
    document.querySelector('.studio').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  elements.qualitySelect.addEventListener('change', setQualityLabel);
  elements.audioUpload.addEventListener('change', event => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => addTrackFromFile(file));
    event.target.value = '';
  });

  document.querySelectorAll('.drum-pad').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.drum-pad').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      triggerDrum(button.dataset.drum);
    });
  });

  elements.recordInstruments.addEventListener('change', e => {
    state.recordInstruments = e.target.checked;
  });

  elements.bpmInput.addEventListener('input', e => {
    state.bpm = Number(e.target.value || 110);
  });
}

function init() {
  setQualityLabel();
  bindControls();
  buildSequencer();
  buildKeyboard();
  buildSoundBank();
  renderTracks();
  renderTrackCount();
  updateRuntime();
}

window.addEventListener('pointerdown', async () => {
  await resumeAudio();
}, { once: true });

init();
