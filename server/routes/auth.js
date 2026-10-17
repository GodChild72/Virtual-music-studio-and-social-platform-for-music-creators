import express from 'express';
import { createUser, createToken, findUserByEmail, verifyPassword } from '../auth.js';

const router = express.Router();

router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  try {
    const user = createUser({ email, password, name });
    const token = createToken(user);
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
      billingStatus: user.billingStatus
    };
    return res.json({ user: safeUser, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  if (!verifyPassword(user, password)) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const token = createToken(user);
  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    billingStatus: user.billingStatus
  };
  return res.json({ user: safeUser, token });
});

export default router;
