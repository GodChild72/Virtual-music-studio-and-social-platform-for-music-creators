import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto' }}>
      <h1>Studio Pro</h1>
      <p>Build, record, mix, and collaborate from one creative workspace.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
        <Link to="/signup"><button>Sign up</button></Link>
        <Link to="/login"><button>Log in</button></Link>
      </div>
      <p style={{ marginTop: 24 }}>Auth routes are implemented for future Pro subscription and user-account workflows.</p>
    </div>
  );
}
