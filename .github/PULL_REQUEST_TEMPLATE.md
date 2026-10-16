---
name: Add local recorder prototype
about: Adds a minimal MediaRecorder-based recorder prototype (start/stop, playback, download). Local-first prototype before adding persistence/auth/collab.

---

### What

This PR adds a simple local recorder prototype implemented with the Web MediaRecorder API. It provides start/stop recording, playback, and a download link for recorded tracks.

### Files added

- `studio.html` — UI for start/stop and listing recorded tracks
- `src/studio.js` — minimal MediaRecorder logic
- `.gitignore`

### Next steps

- Add persistence (upload to S3 / Firebase Storage)
- Add user authentication (OAuth/JWT or Firebase Auth)
- Build multi-track mixer with per-track volume and panning
- Add server endpoints to store session metadata and assets

### How to test

1. Switch to branch: `git checkout feature/studio-prototype`
2. Serve files locally: `python3 -m http.server 8000`
3. Open `http://localhost:8000/studio.html` and test recording
