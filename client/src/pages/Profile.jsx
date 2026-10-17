import React from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <div style={{ padding: 24 }}>Loading profile...</div>;

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: '0 auto' }}>
      <h2>My profile</h2>
      <p><strong>Name:</strong> {user.name || '(not set)'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Plan:</strong> {user.plan}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
