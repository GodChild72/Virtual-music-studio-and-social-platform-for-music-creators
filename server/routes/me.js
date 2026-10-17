import { authMiddleware } from '../middleware/auth.js';
import { readDb } from '../db.js';
import express from 'express';

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  const db = readDb();
  const user = db.users.find((entry) => entry.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    billingStatus: user.billingStatus || 'free',
    currentPeriodEnd: user.currentPeriodEnd || null
  };

  return res.json({ user: safeUser });
});

export default router;
