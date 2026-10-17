const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'studio-pro-platform',
    timestamp: new Date().toISOString()
  });
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

app.listen(PORT, () => {
  console.log(`Studio Pro API running on http://localhost:${PORT}`);
});
