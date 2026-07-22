import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please fill in both Username/Email and Password.');
      return;
    }
    // Demo authentication — navigate to dashboard on success
    navigate('/dashboard');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h2>Library Portal</h2>
          <p>Sign in to access management dashboard</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username / Email</label>
            <input
              type="text"
              id="login-username"
              name="username"
              className="form-control"
              placeholder="admin@library.com"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            id="login-submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }}
          >
            Login to Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Demo: any username &amp; password will work
        </p>
      </div>
    </div>
  );
}
