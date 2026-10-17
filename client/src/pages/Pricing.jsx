import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';

export default function Pricing() {
  const { user, token } = useAuth();

  async function startCheckout() {
    if (!user || !token) {
      window.location.href = '/login';
      return;
    }

    const response = await fetch('/api/billing/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ priceId: 'price_studio_pro_monthly' })
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || 'Failed to start checkout');
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <h1>Studio Pro plans</h1>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div style={{ border: '1px solid #334155', borderRadius: 18, padding: 20 }}>
          <h2>Free</h2>
          <p>For learning and light recording workflows.</p>
          <strong>$0/mo</strong>
        </div>
        <div style={{ border: '1px solid #8b5cf6', borderRadius: 18, padding: 20, background: '#140f29' }}>
          <h2>Studio Pro</h2>
          <p>Unlimited recordings, project exports, collaboration, and premium studio features.</p>
          <strong>$19/mo</strong>
          <div style={{ marginTop: 16 }}>
            <button onClick={startCheckout}>Upgrade to Pro</button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="/">Back home</Link>
      </div>
    </div>
  );
}
