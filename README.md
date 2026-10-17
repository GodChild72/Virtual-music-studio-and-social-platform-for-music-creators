# Studio Pro Platform

This repository is being evolved from a static landing page into a full music platform foundation.

## Current phase

This is Step 1: app architecture baseline.

### Included
- React + Vite frontend shell
- Express API server
- environment configuration
- project folder structure for future auth, billing, recording, and collaboration work

### Run locally

```bash
npm install
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- API: http://localhost:4000

### API endpoints

- GET /api/health
- GET /api/roadmap

## Next steps

1. Add authentication and user accounts
2. Add billing and Stripe checkout
3. Add Pro feature gating
4. Add recording persistence and storage
5. Add multi-track project data model
6. Add collaboration and sharing
7. Add audio export pipeline and deployment
