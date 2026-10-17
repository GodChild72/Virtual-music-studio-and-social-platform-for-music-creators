import { verifyToken } from '../auth.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);

  if (!match) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = verifyToken(match[1]);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = payload;
  return next();
}
