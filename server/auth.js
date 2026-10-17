import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDb } from './db.js';

const SECRET = process.env.SESSION_SECRET || 'change-me-in-production';
const TOKEN_EXP = '30d';

export function findUserByEmail(email) {
  const db = readDb();
  return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function createUser({ email, password, name }) {
  const db = readDb();
  if (findUserByEmail(email)) throw new Error('User already exists');

  const user = {
    id: `u_${Date.now()}`,
    email,
    name: name || '',
    password: bcrypt.hashSync(password, 10),
    plan: 'free',
    createdAt: new Date().toISOString()
  };

  db.users.push(user);
  fsWriteDb(db);
  return user;
}

export function verifyPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

export function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, plan: user.plan }, SECRET, {
    expiresIn: TOKEN_EXP
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

function fsWriteDb(db) {
  const fs = awaitableFs();
  fs.writeFileSync(new URL('./data/db.json', import.meta.url), JSON.stringify(db, null, 2));
}

function awaitableFs() {
  return await import('node:fs');
}
