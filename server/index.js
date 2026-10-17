import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.js';
import meRoutes from './routes/me.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

dotenv.config();

app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'studio-pro-platform', timestamp: new Date().toISOString() });
});

app.get('/api/roadmap', (req, res) => {
  res.json({
    steps: [
      'Authentication and user accounts',
      'Subscription and billing with Stripe',
      'Feature gating for Pro access',
      'Recording storage and project persistence',
      'Collaborative music workflows',
      'Production-grade export pipeline'
    ]
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/auth', meRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Studio Pro API running on http://localhost:${PORT}`);
});
