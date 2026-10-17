import React from 'react';

export default function BillingCancel() {
  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
      <h1>Checkout cancelled</h1>
      <p>No charge was made. You can try again anytime.</p>
      <a href="/pricing">Back to plans</a>
    </div>
  );
}
