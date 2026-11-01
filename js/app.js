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

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 20000;
  filter.Q.value = 0.7;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -24;
  compressor.knee.value = 25;
  compressor.ratio.value = 10;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.2;

  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -1;
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

  state.audioCtx = ctx;
  state.masterGain = master;
  state.masterFilter = filter;
  state.compressor = compressor;
  state.limiter = limiter;
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

  const oscA = ctx.createOscillator();
  const oscB = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const drive = ctx.createWaveShaper();

  drive.curve = makeDriveCurve(config.drive || 0.5);
  drive.oversample = '4x';

  oscA.type = config.wave1;
  oscB.type = config.wave2;
  oscA.frequency.value = freq;
  oscB.frequency.value = freq * (config.ratio || 1);

  filter.type = config.filterType || 'lowpass';
  filter.frequency.value = config.filterFrequency || 1500;
  filter.Q.value = config.resonance || 1.5;

  const envSeconds = durationOverride || (preset === 'pad' || preset === 'trancepad' ? 1.8 : 0.7);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(config.gain || 0.7, now + Math.max(0.01, config.attack || 0.02));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + envSeconds + (config.release || 0.5));

  oscA.connect(filter);
  oscB.connect(filter);
  filter.connect(drive);
  drive.connect(gain);
  gain.connect(state.instrumentGain);

  oscA.start(now);
  oscB.start(now);
  oscA.stop(now + envSeconds + (config.release || 0.5));
  oscB.stop(now + envSeconds + (config.release || 0.5));
}

function playRiseFX() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(90, now);
  osc.frequency.exponentialRampToValueAtTime(1800, now + 1.3);

  filter.type = 'highpass';
  filter.frequency.value = 400;
  filter.Q.value = 1.2;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.55, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(state.instrumentGain);
  osc.start(now);
  osc.stop(now + 1.5);
}

function playKick() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;

  const sub = ctx.createOscillator();
  const subGain = ctx.createGain();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(58, now);
  sub.frequency.exponentialRampToValueAtTime(38, now + 0.35);
  subGain.gain.setValueAtTime(1.25, now);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
  sub.connect(subGain);
  subGain.connect(state.instrumentGain);
  sub.start(now);
  sub.stop(now + 0.52);

  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = 'square';
  clickOsc.frequency.setValueAtTime(180, now);
  clickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.03);
  clickGain.gain.setValueAtTime(0.7, now);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  clickOsc.connect(clickGain);
  clickGain.connect(state.instrumentGain);
  clickOsc.start(now);
  clickOsc.stop(now + 0.07);

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  const noiseFilter = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 1100;
  noiseGain.gain.setValueAtTime(0.18, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(state.instrumentGain);
  noise.start(now);
  noise.stop(now + 0.08);
}

function playSnare() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.24, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    const envelope = Math.exp(-i / (noiseData.length * 0.18));
    noiseData[i] = (Math.random() * 2 - 1) * envelope;
  }

  const noise = ctx.createBufferSource();
  const noiseFilter = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 2200;
  noiseGain.gain.setValueAtTime(0.95, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(state.instrumentGain);
  noise.start(now);
  noise.stop(now + 0.24);

  const tone = ctx.createOscillator();
  const toneGain = ctx.createGain();
  tone.type = 'triangle';
  tone.frequency.setValueAtTime(175, now);
  tone.frequency.exponentialRampToValueAtTime(95, now + 0.16);
  toneGain.gain.setValueAtTime(0.7, now);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  tone.connect(toneGain);
  toneGain.connect(state.instrumentGain);
  tone.start(now);
  tone.stop(now + 0.18);
}

function playHiHat() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;

  const layers = [6000, 9000, 12000];
  layers.forEach((freq, index) => {
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseData.length * 0.25));

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = noiseBuffer;
    filter.type = 'highpass';
    filter.frequency.value = freq;
    gain.gain.setValueAtTime(index === 0 ? 0.52 : 0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(state.instrumentGain);
    source.start(now);
    source.stop(now + 0.08);
  });
}

function playBongo() {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
  gain.gain.setValueAtTime(0.9, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
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
