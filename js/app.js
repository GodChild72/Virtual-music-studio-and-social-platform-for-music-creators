const soundBank = [
  { id: 'heavybass', name: 'Heavy Sub Bass', type: 'Bass' },
  { id: 'clubbass', name: 'Club Bass', type: 'Bass' },
  { id: 'trapbass', name: 'Trap Bass', type: 'Bass' },
  { id: 'lead', name: 'Analog Lead', type: 'Lead' },
  { id: 'trancelead', name: 'Trance Lead', type: 'Lead' },
  { id: 'pad', name: 'Ambient Pad', type: 'Pad' },
  { id: 'trancepad', name: 'Trance Pad', type: 'Pad' },
  { id: 'epiano', name: 'Classic EP', type: 'Keys' },
  { id: 'kick', name: 'Punch Kick', type: 'Drum' },
  { id: 'snare', name: 'Crack Snare', type: 'Drum' },
  { id: 'hihat', name: 'Open Hat', type: 'Drum' },
  { id: 'bongo', name: 'Bongo Rush', type: 'Percussion' },
  { id: 'tom', name: 'Tom Depth', type: 'Percussion' },
  { id: 'fxrise', name: 'Rise FX', type: 'FX' },
];

const synthPresets = {
  heavybass: {
    wave1: 'sawtooth',
    wave2: 'triangle',
    ratio: 0.5,
    filterType: 'lowpass',
    filterFrequency: 850,
    resonance: 2.4,
    attack: 0.01,
    release: 0.7,
    gain: 0.95,
    drive: 0.7,
    stack: 3,
    detune: 6,
    sub: true,
    subGain: 0.65,
    filterEnv: true,
    filterEnvAmount: 3.5,
    filterEnvDecay: 0.18,
    decay: 0.22,
    sustain: 0.3,
    reverb: 0.05,
  },
  clubbass: {
    wave1: 'sawtooth',
    wave2: 'square',
    ratio: 0.5,
    filterType: 'lowpass',
    filterFrequency: 1200,
    resonance: 3.1,
    attack: 0.012,
    release: 0.82,
    gain: 0.9,
    drive: 0.9,
    stack: 3,
    detune: 8,
    sub: true,
    subGain: 0.6,
    filterEnv: true,
    filterEnvAmount: 3,
    filterEnvDecay: 0.15,
    decay: 0.2,
    sustain: 0.35,
    reverb: 0.05,
  },
  trapbass: {
    wave1: 'square',
    wave2: 'triangle',
    ratio: 0.25,
    filterType: 'lowpass',
    filterFrequency: 950,
    resonance: 4.2,
    attack: 0.006,
    release: 0.55,
    gain: 0.88,
    drive: 1.2,
    stack: 2,
    detune: 5,
    sub: true,
    subGain: 0.8,
    filterEnv: true,
    filterEnvAmount: 2.5,
    filterEnvDecay: 0.12,
    decay: 0.3,
    sustain: 0.45,
    reverb: 0.03,
  },
  lead: {
    wave1: 'sawtooth',
    wave2: 'square',
    ratio: 1,
    filterType: 'bandpass',
    filterFrequency: 4200,
    resonance: 1.7,
    attack: 0.02,
    release: 0.4,
    gain: 0.68,
    drive: 0.55,
    stack: 3,
    detune: 10,
    vibrato: true,
    filterEnv: true,
    filterEnvAmount: 2,
    filterEnvDecay: 0.25,
    decay: 0.3,
    sustain: 0.55,
    reverb: 0.22,
  },
  trancelead: {
    wave1: 'sawtooth',
    wave2: 'triangle',
    ratio: 1,
    filterType: 'lowpass',
    filterFrequency: 6000,
    resonance: 2.6,
    attack: 0.015,
    release: 0.5,
    gain: 0.7,
    drive: 0.75,
    stack: 5,
    detune: 14,
    vibrato: true,
    filterEnv: true,
    filterEnvAmount: 2.2,
    filterEnvDecay: 0.3,
    decay: 0.35,
    sustain: 0.6,
    reverb: 0.28,
  },
  pad: {
    wave1: 'triangle',
    wave2: 'sine',
    ratio: 1,
    filterType: 'lowpass',
    filterFrequency: 1700,
    resonance: 1.4,
    attack: 0.09,
    release: 1.5,
    gain: 0.45,
    drive: 0.4,
    stack: 3,
    detune: 8,
    filterEnv: true,
    filterEnvAmount: 1.5,
    filterEnvDecay: 0.6,
    decay: 0.8,
    sustain: 0.8,
    reverb: 0.4,
  },
  trancepad: {
    wave1: 'sine',
    wave2: 'triangle',
    ratio: 1,
    filterType: 'lowpass',
    filterFrequency: 2200,
    resonance: 1.8,
    attack: 0.11,
    release: 1.8,
    gain: 0.52,
    drive: 0.5,
    stack: 4,
    detune: 12,
    filterEnv: true,
    filterEnvAmount: 1.8,
    filterEnvDecay: 0.7,
    decay: 0.9,
    sustain: 0.85,
    reverb: 0.45,
  },
  epiano: {
    wave1: 'triangle',
    wave2: 'sine',
    ratio: 1,
    filterType: 'bandpass',
    filterFrequency: 2400,
    resonance: 1.5,
    attack: 0.02,
    release: 0.8,
    gain: 0.6,
    drive: 0.25,
    stack: 2,
    detune: 4,
    tine: true,
    decay: 0.35,
    sustain: 0.12,
    reverb: 0.25,
  },
};

const genreProfiles = {
  hiphop: {
    label: 'Hip Hop',
    bpm: 92,
    kick: [1,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0],
    snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    preset: 'heavybass'
  },
  trap: {
    label: 'Trap',
    bpm: 140,
    kick: [1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
    snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    hihat: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    preset: 'trapbass'
  },
  club: {
    label: 'Club',
    bpm: 124,
    kick: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    hihat: [1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1],
    preset: 'clubbass'
  },
  trance: {
    label: 'Trance',
    bpm: 128,
    kick: [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1],
    snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    preset: 'trancelead'
  },
  electronic: {
    label: 'Electronic',
    bpm: 118,
    kick: [1,0,0,0,1,0,1,0,1,0,0,1,1,0,1,0],
    snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    hihat: [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0],
    preset: 'trancepad'
  }
};

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
  masterFilter: null,
  compressor: null,
  limiter: null,
  reverbSend: null,
  reverbGain: null,
  convolver: null,
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
  currentGenre: 'hiphop',
  masterLevel: 1,
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
  genreSelect: document.getElementById('genreSelect'),
  masterLevel: document.getElementById('masterLevel'),
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

  // Gentle highpass: clears sub-bass mud without touching the music.
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 28;
  filter.Q.value = 0.7;

  // Glue compressor: gentle, musical bus compression instead of the
  // old crushing settings, so the mix breathes.
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 20;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.01;
  compressor.release.value = 0.25;

  // Safety limiter: catches peaks without squashing the mix.
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -1.5;
  limiter.knee.value = 0;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.001;
  limiter.release.value = 0.05;

  master.connect(filter);
  filter.connect(compressor);
  compressor.connect(limiter);
  limiter.connect(ctx.destination);

  const instrumentGain = ctx.createGain();
  instrumentGain.gain.value = 1;
  instrumentGain.connect(master);

  const dest = ctx.createMediaStreamDestination();
  instrumentGain.connect(dest);

  // Generated room reverb: no audio files needed. Voices send into
  // reverbSend, and the wet signal returns into instrumentGain, so
  // reverb is heard live AND captured in exported mixes.
  const reverbSend = ctx.createGain();
  reverbSend.gain.value = 1;
  const convolver = ctx.createConvolver();
  convolver.buffer = makeImpulseResponse(ctx, 2.4, 3.0);
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.22;
  reverbSend.connect(convolver);
  convolver.connect(reverbGain);
  reverbGain.connect(instrumentGain);

  state.audioCtx = ctx;
  state.masterGain = master;
  state.masterFilter = filter;
  state.compressor = compressor;
  state.limiter = limiter;
  state.instrumentGain = instrumentGain;
  state.instrumentDest = dest;
  state.reverbSend = reverbSend;
  state.reverbGain = reverbGain;
  state.convolver = convolver;

  return ctx;
}


async function resumeAudio() {
  const ctx = ensureAudio();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}

// A generated stereo room impulse: decaying noise shaped into a
// natural-sounding space. No sample files, no downloads, no licensing.
function makeImpulseResponse(ctx, seconds = 2.4, decay = 3.0) {
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * seconds);
  const impulse = ctx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

function makeNoiseBuffer(ctx, seconds) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

// Routes a voice to the dry mix and, when amount > 0, to the reverb bus.
function routeVoice(output, reverbAmount = 0.15) {
  const ctx = state.audioCtx;
  output.connect(state.instrumentGain);
  if (reverbAmount > 0 && state.reverbSend) {
    const send = ctx.createGain();
    send.gain.value = reverbAmount;
    output.connect(send);
    send.connect(state.reverbSend);
  }
}

// ADSR envelope on a gain param: attack to peak, decay to sustain,
// hold until holdEnd, then release to silence.
function applyAdsr(param, now, { peak = 0.7, attack = 0.02, decay = 0.25, sustain = 0.4, holdEnd, release = 0.4 }) {
  const hold = Math.max(holdEnd, now + attack + decay + 0.02);
  param.setValueAtTime(0.0001, now);
  param.linearRampToValueAtTime(Math.max(0.0002, peak), now + Math.max(0.005, attack));
  param.exponentialRampToValueAtTime(Math.max(0.0002, sustain), now + Math.max(0.005, attack) + decay);
  param.setValueAtTime(Math.max(0.0002, sustain), hold);
  param.exponentialRampToValueAtTime(0.0001, hold + release);
}

// Filter envelope: the cutoff sweeps from start down to end, which is
// what makes a synth note feel alive instead of flat.
function applyFilterEnvelope(filter, now, { start, end, decay = 0.2 }) {
  filter.frequency.setValueAtTime(Math.max(20, start), now);
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, end), now + decay);
}

function setStatus(text) {
  elements.statusPill.textContent = text;
}

function setPauseButtonState(isPaused) {
  elements.pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function setPatternButtonState(isPlaying) {
  elements.playPatternBtn.textContent = isPlaying ? 'Stop Pattern' : 'Play Pattern';
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

function updateMasterMeter() {
  const value = Number(state.masterLevel || 1);
  elements.masterMeter.textContent = `Master: ${value.toFixed(2)} dB`;
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

function applyGenreProfile() {
  const genre = state.currentGenre || 'hiphop';
  const profile = genreProfiles[genre];
  if (!profile) return;

  state.pattern.kick = [...profile.kick];
  state.pattern.snare = [...profile.snare];
  state.pattern.hihat = [...profile.hihat];
  if (elements.genreSelect) elements.genreSelect.value = genre;
  if (elements.bpmInput) elements.bpmInput.value = String(profile.bpm);
  state.bpm = profile.bpm;
  if (elements.presetSelect) {
    const preset = profile.preset || 'heavybass';
    elements.presetSelect.value = preset;
  }
  setStatus(`${profile.label} profile loaded`);
  renderPatternSelection();
}

function renderPatternSelection() {
  document.querySelectorAll('.step-button').forEach((button) => {
    const stepIndex = Number(button.dataset.index || 0);
    const currentDrum = document.querySelector('.drum-pad.active')?.dataset.drum || 'kick';
    const active = !!state.pattern[currentDrum]?.[stepIndex];
    button.classList.toggle('active', active);
  });
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
      else if (id === 'clubbass') playClubBass();
      else if (id === 'trapbass') playTrapBass();
      else if (id === 'lead') playLead();
      else if (id === 'trancelead') playTranceLead();
      else if (id === 'pad') playPad();
      else if (id === 'trancepad') playTrancePad();
      else if (id === 'epiano') playEPiano();
      else if (id === 'kick') playKick();
      else if (id === 'snare') playSnare();
      else if (id === 'hihat') playHiHat();
      else if (id === 'bongo') playBongo();
      else if (id === 'tom') playTom();
      else if (id === 'fxrise') playRiseFX();
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

function makeDriveCurve(amount = 0.8) {
  const samples = 2048;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = 0.75 * Math.tanh(x * (1.6 + amount)) + 0.15 * x;
  }
  return curve;
}

function playSynthVoice(freq, preset = 'heavybass', durationOverride = null) {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const config = synthPresets[preset] || synthPresets.heavybass;

  const filter = ctx.createBiquadFilter();
  const drive = ctx.createWaveShaper();
  const gain = ctx.createGain();

  drive.curve = makeDriveCurve(config.drive || 0.5);
  drive.oversample = '4x';

  filter.type = config.filterType || 'lowpass';
  filter.frequency.value = config.filterFrequency || 1500;
  filter.Q.value = config.resonance || 1.5;

  const envSeconds = durationOverride || (preset === 'pad' || preset === 'trancepad' ? 1.8 : 0.7);
  const release = config.release || 0.5;
  const stopAt = now + envSeconds + release + 0.1;

  // Detuned oscillator stack: the thickness real synths get from
  // several slightly out-of-tune voices playing together.
  const stackCount = config.stack || 3;
  const spread = config.detune || 8;
  const voices = [];
  for (let i = 0; i < stackCount; i++) {
    const osc = ctx.createOscillator();
    osc.type = config.wave1;
    osc.frequency.value = freq;
    osc.detune.value = (i - (stackCount - 1) / 2) * spread;
    osc.connect(filter);
    voices.push(osc);
  }
  // Second waveform, detuned the other way for width.
  const oscB = ctx.createOscillator();
  oscB.type = config.wave2;
  oscB.frequency.value = freq * (config.ratio || 1);
  oscB.detune.value = spread / 2;
  oscB.connect(filter);
  voices.push(oscB);

  // Sub oscillator: pure low weight that stays clean (bypasses drive).
  let sub = null;
  let subGain = null;
  if (config.sub) {
    sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = freq * (config.subRatio || 0.5);
    subGain = ctx.createGain();
    subGain.gain.value = config.subGain || 0.6;
    sub.connect(subGain);
    subGain.connect(gain);
  }

  // Filter envelope: the cutoff sweeps as the note plays.
  if (config.filterEnv) {
    applyFilterEnvelope(filter, now, {
      start: (config.filterFrequency || 1500) * (config.filterEnvAmount || 3),
      end: config.filterFrequency || 1500,
      decay: config.filterEnvDecay || 0.25,
    });
  }

  // Gentle vibrato on leads: a slow pitch wobble that fades in.
  let lfo = null;
  let lfoGain = null;
  if (config.vibrato) {
    lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 5.5;
    lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0, now);
    lfoGain.gain.linearRampToValueAtTime(freq * 0.006, now + 0.15);
    lfo.connect(lfoGain);
    voices.forEach(osc => lfoGain.connect(osc.frequency));
  }

  // EP tine: a short, bright harmonic ping on top of electric pianos.
  let tine = null;
  let tineGain = null;
  if (config.tine) {
    tine = ctx.createOscillator();
    tine.type = 'sine';
    tine.frequency.value = freq * 3.98;
    tineGain = ctx.createGain();
    tineGain.gain.setValueAtTime(0.16, now);
    tineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    tine.connect(tineGain);
    tineGain.connect(gain);
  }

  filter.connect(drive);
  drive.connect(gain);
  applyAdsr(gain.gain, now, {
    peak: config.gain || 0.7,
    attack: config.attack || 0.02,
    decay: config.decay || 0.25,
    sustain: config.sustain != null ? config.sustain : 0.4,
    holdEnd: now + envSeconds,
    release,
  });
  routeVoice(gain, config.reverb != null ? config.reverb : 0.15);

  voices.forEach(osc => { osc.start(now); osc.stop(stopAt); });
  if (sub) { sub.start(now); sub.stop(stopAt); }
  if (lfo) { lfo.start(now); lfo.stop(stopAt); }
  if (tine) { tine.start(now); tine.stop(now + 0.3); }
}


function playRiseFX() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();

  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(1800, now + 1.3);
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(9000, now + 1.3);
  filter.Q.value = 1.2;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.5, now + 1.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(bus);

  const noise = ctx.createBufferSource();
  noise.buffer = makeNoiseBuffer(ctx, 1.4);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(800, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(6000, now + 1.3);
  noiseFilter.Q.value = 0.8;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.linearRampToValueAtTime(0.22, now + 1.1);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(bus);

  routeVoice(bus, 0.5);
  osc.start(now);
  osc.stop(now + 1.55);
  noise.start(now);
  noise.stop(now + 1.5);
}

function playKick() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();
  bus.gain.value = 1;

  // Sub punch: a fast pitch drop gives the chest hit.
  const sub = ctx.createOscillator();
  const subGain = ctx.createGain();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(160, now);
  sub.frequency.exponentialRampToValueAtTime(43, now + 0.11);
  subGain.gain.setValueAtTime(1.0, now);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
  sub.connect(subGain);
  subGain.connect(bus);

  // Body: a low-mid thump that makes it sound like a drum, not a beep.
  const body = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  body.type = 'sine';
  body.frequency.setValueAtTime(110, now);
  body.frequency.exponentialRampToValueAtTime(65, now + 0.1);
  bodyGain.gain.setValueAtTime(0.5, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  body.connect(bodyGain);
  bodyGain.connect(bus);

  // Click: the beater attack that cuts through a mix.
  const click = ctx.createBufferSource();
  click.buffer = makeNoiseBuffer(ctx, 0.02);
  const clickFilter = ctx.createBiquadFilter();
  clickFilter.type = 'highpass';
  clickFilter.frequency.value = 3000;
  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.35, now);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
  click.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(bus);

  const drive = ctx.createWaveShaper();
  drive.curve = makeDriveCurve(0.35);
  drive.oversample = '2x';
  bus.connect(drive);
  routeVoice(drive, 0.04);

  sub.start(now);
  sub.stop(now + 0.5);
  body.start(now);
  body.stop(now + 0.2);
  click.start(now);
  click.stop(now + 0.03);
}

function playSnare() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();

  // Crack: bright noise burst.
  const noise = ctx.createBufferSource();
  noise.buffer = makeNoiseBuffer(ctx, 0.25);
  const band = ctx.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = 1800;
  band.Q.value = 0.8;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.9, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  noise.connect(band);
  band.connect(noiseGain);
  noiseGain.connect(bus);

  // Snap: a very short high-frequency snap on top.
  const snap = ctx.createBufferSource();
  snap.buffer = makeNoiseBuffer(ctx, 0.05);
  const snapFilter = ctx.createBiquadFilter();
  snapFilter.type = 'highpass';
  snapFilter.frequency.value = 5200;
  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(0.5, now);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  snap.connect(snapFilter);
  snapFilter.connect(snapGain);
  snapGain.connect(bus);

  // Body: the drum's low tone.
  const tone = ctx.createOscillator();
  const toneGain = ctx.createGain();
  tone.type = 'triangle';
  tone.frequency.setValueAtTime(195, now);
  tone.frequency.exponentialRampToValueAtTime(135, now + 0.14);
  toneGain.gain.setValueAtTime(0.6, now);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  tone.connect(toneGain);
  toneGain.connect(bus);

  routeVoice(bus, 0.18);
  tone.start(now);
  tone.stop(now + 0.2);
  noise.start(now);
  noise.stop(now + 0.25);
  snap.start(now);
  snap.stop(now + 0.06);
}

function playHiHat() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();

  // Metallic shimmer: inharmonic square partials, the way classic
  // drum machines build a hat.
  [587, 845, 1244, 1698, 2139, 2960].forEach(freq => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    osc.connect(g);
    g.connect(bus);
    osc.start(now);
    osc.stop(now + 0.09);
  });

  // Air: highpassed noise for the sizzle.
  const noise = ctx.createBufferSource();
  noise.buffer = makeNoiseBuffer(ctx, 0.1);
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 7800;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  noise.connect(hp);
  hp.connect(noiseGain);
  noiseGain.connect(bus);

  routeVoice(bus, 0.12);
  noise.start(now);
  noise.stop(now + 0.1);
}

function playBongo() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();

  // Membrane: fundamental plus a shell partial.
  const membrane = ctx.createOscillator();
  const membraneGain = ctx.createGain();
  membrane.type = 'sine';
  membrane.frequency.setValueAtTime(230, now);
  membrane.frequency.exponentialRampToValueAtTime(165, now + 0.12);
  membraneGain.gain.setValueAtTime(0.85, now);
  membraneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
  membrane.connect(membraneGain);
  membraneGain.connect(bus);

  const shell = ctx.createOscillator();
  const shellGain = ctx.createGain();
  shell.type = 'triangle';
  shell.frequency.setValueAtTime(345, now);
  shell.frequency.exponentialRampToValueAtTime(250, now + 0.08);
  shellGain.gain.setValueAtTime(0.35, now);
  shellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
  shell.connect(shellGain);
  shellGain.connect(bus);

  // Slap: the short hand-hit transient.
  const slap = ctx.createBufferSource();
  slap.buffer = makeNoiseBuffer(ctx, 0.03);
  const slapFilter = ctx.createBiquadFilter();
  slapFilter.type = 'bandpass';
  slapFilter.frequency.value = 1200;
  slapFilter.Q.value = 1.2;
  const slapGain = ctx.createGain();
  slapGain.gain.setValueAtTime(0.3, now);
  slapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
  slap.connect(slapFilter);
  slapFilter.connect(slapGain);
  slapGain.connect(bus);

  routeVoice(bus, 0.15);
  membrane.start(now);
  membrane.stop(now + 0.3);
  shell.start(now);
  shell.stop(now + 0.18);
  slap.start(now);
  slap.stop(now + 0.04);
}

function playTom() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();

  const drum = ctx.createOscillator();
  const drumGain = ctx.createGain();
  drum.type = 'sine';
  drum.frequency.setValueAtTime(150, now);
  drum.frequency.exponentialRampToValueAtTime(62, now + 0.24);
  drumGain.gain.setValueAtTime(0.9, now);
  drumGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
  drum.connect(drumGain);
  drumGain.connect(bus);

  const partial = ctx.createOscillator();
  const partialGain = ctx.createGain();
  partial.type = 'triangle';
  partial.frequency.setValueAtTime(225, now);
  partial.frequency.exponentialRampToValueAtTime(95, now + 0.2);
  partialGain.gain.setValueAtTime(0.3, now);
  partialGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
  partial.connect(partialGain);
  partialGain.connect(bus);

  routeVoice(bus, 0.15);
  drum.start(now);
  drum.stop(now + 0.5);
  partial.start(now);
  partial.stop(now + 0.34);
}

function playClap() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const bus = ctx.createGain();

  // A real clap is several fast handclaps plus a roomy tail,
  // not one drum hit.
  const bursts = [
    [0.0, 0.65], [0.012, 0.8], [0.024, 0.9], [0.04, 0.6],
  ];
  bursts.forEach(([offset, level]) => {
    const burst = ctx.createBufferSource();
    burst.buffer = makeNoiseBuffer(ctx, 0.03);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1300;
    filter.Q.value = 1.4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(level, now + offset);
    g.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.018);
    burst.connect(filter);
    filter.connect(g);
    g.connect(bus);
    burst.start(now + offset);
    burst.stop(now + offset + 0.03);
  });

  // Tail: the wash of reflections after the claps.
  const tail = ctx.createBufferSource();
  tail.buffer = makeNoiseBuffer(ctx, 0.4);
  const tailFilter = ctx.createBiquadFilter();
  tailFilter.type = 'bandpass';
  tailFilter.frequency.value = 1100;
  tailFilter.Q.value = 0.7;
  const tailGain = ctx.createGain();
  tailGain.gain.setValueAtTime(0.45, now + 0.03);
  tailGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  tail.connect(tailFilter);
  tailFilter.connect(tailGain);
  tailGain.connect(bus);

  routeVoice(bus, 0.3);
  tail.start(now + 0.03);
  tail.stop(now + 0.42);
}


function playHeavyBass() {
  playSynthVoice(46, 'heavybass');
}

function playClubBass() {
  playSynthVoice(43.65, 'clubbass');
}

function playTrapBass() {
  playSynthVoice(41.2, 'trapbass');
}

function playLead() {
  playSynthVoice(220, 'lead');
}

function playTranceLead() {
  playSynthVoice(220, 'trancelead');
}

function playPad() {
  playSynthVoice(164.81, 'pad');
}

function playTrancePad() {
  playSynthVoice(164.81, 'trancepad');
}

function playEPiano() {
  playSynthVoice(220, 'epiano');
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

  setPatternButtonState(true);

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
  setPatternButtonState(false);
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
      playSynthVoice(noteToFrequency(note), preset);
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

async function togglePause() {
  const ctx = ensureAudio();
  if (!ctx) return;

  if (ctx.state === 'running') {
    await ctx.suspend();
    setPauseButtonState(true);
    setStatus(state.isRecording ? 'Recording Paused' : 'Paused');
    return;
  }

  await ctx.resume();
  setPauseButtonState(false);
  setStatus(state.isRecording ? 'Recording' : 'Ready');
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

function applyMasterLevel() {
  const level = Number(elements.masterLevel.value || 1);
  state.masterLevel = level;
  if (state.masterGain) {
    state.masterGain.gain.value = level;
  }
  updateMasterMeter();
}

function bindControls() {
  elements.recordBtn.addEventListener('click', toggleRecord);
  elements.recordMicBtn.addEventListener('click', toggleRecord);
  elements.pauseBtn.addEventListener('click', togglePause);
  elements.exportBtn.addEventListener('click', exportMixdown);
  elements.loadSoundBankBtn.addEventListener('click', () => {
    buildSoundBank();
    setStatus('Sound bank loaded');
  });
  elements.clearSessionBtn.addEventListener('click', clearTracks);
  elements.stopPlaybackBtn.addEventListener('click', stopAllPlayback);
  elements.playPatternBtn.addEventListener('click', () => {
    if (state.isPlayingPattern) {
      stopPattern();
    } else {
      playPattern();
    }
  });
  elements.stopPatternBtn.addEventListener('click', stopPattern);
  elements.enterStudioBtn.addEventListener('click', () => {
    document.querySelector('.studio').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  elements.qualitySelect.addEventListener('change', setQualityLabel);
  elements.genreSelect.addEventListener('change', (event) => {
    state.currentGenre = event.target.value;
    applyGenreProfile();
  });
  elements.masterLevel.addEventListener('input', applyMasterLevel);
  elements.audioUpload.addEventListener('change', event => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => addTrackFromFile(file));
    event.target.value = '';
  });

  document.querySelectorAll('.drum-pad').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.drum-pad').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      renderPatternSelection();
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
  setPauseButtonState(false);
  setPatternButtonState(false);
  bindControls();
  buildSequencer();
  buildKeyboard();
  buildSoundBank();
  applyMasterLevel();
  state.currentGenre = 'hiphop';
  applyGenreProfile();
  renderTracks();
  renderTrackCount();
  updateRuntime();
}

window.addEventListener('pointerdown', async () => {
  await resumeAudio();
}, { once: true });

init();
