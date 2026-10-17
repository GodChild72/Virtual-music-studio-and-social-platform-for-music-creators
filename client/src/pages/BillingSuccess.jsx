import React from 'react';

export default function BillingSuccess() {
  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
      <h1>Subscription successful</h1>
      <p>Thank you for upgrading to Studio Pro. Your account will be updated shortly.</p>
      <a href="/profile">Go to profile</a>
    </div>
  );
}
