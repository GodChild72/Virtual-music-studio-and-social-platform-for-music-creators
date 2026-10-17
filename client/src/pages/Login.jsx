import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'salmon' }}>{error}</p>}
      </form>
      <p>Need an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
