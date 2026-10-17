import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthProvider.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Pricing from './pages/Pricing.jsx';
import BillingSuccess from './pages/BillingSuccess.jsx';
import BillingCancel from './pages/BillingCancel.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ background: '#0b1020', minHeight: '100vh', color: '#f3f4f6' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #1f2937' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Studio Pro</Link>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/pricing" style={{ color: '#fff', textDecoration: 'none' }}>Pricing</Link>
              <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
              <Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>Signup</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/billing/success" element={<BillingSuccess />} />
            <Route path="/billing/cancel" element={<BillingCancel />} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
