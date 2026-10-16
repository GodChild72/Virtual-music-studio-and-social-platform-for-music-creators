// Minimal recorder using MediaRecorder. Creates downloadable audio tracks.

let mediaRecorder;
let chunks = [];
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const tracksDiv = document.getElementById('tracks');

startBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);

      const container = document.createElement('div');
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = url;

      const a = document.createElement('a');
      a.href = url;
      a.download = `track-${Date.now()}.webm`;
      a.textContent = 'Download';

      container.appendChild(audio);
      container.appendChild(document.createTextNode(' '));
      container.appendChild(a);
      tracksDiv.prepend(container);
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    alert('Could not start recording: ' + err.message);
  }
});

stopBtn.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});
