import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors before a new attempt

    if (!form.email || !form.password) {
        setError('Please fill in all fields.');
        return;
    }

    setLoading(true);

    try {
        // Make the POST request to your Spring Boot endpoint
        const response = await fetch('http://localhost:8080/tutor/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
            }),
        });

        // Check if the HTTP status is 200 (OK)
        if (response.ok) {
            const successMessage = await response.text(); 
            console.log("Server says:", successMessage);
            
            // Login was successful, navigate to the dashboard/home
            navigate('/Tutor'); 
        } else {
            // The server returned a 401 Unauthorized or similar error
            const errorMessage = await response.text();
            setError(errorMessage || 'Invalid email or password.');
        }
    } catch (err) {
        // This catches network errors (e.g., if your Spring Boot server is turned off)
        console.error("Network Error:", err);
        setError('Unable to connect to the server. Is the backend running?');
    } finally {
        // Always stop the loading spinner, whether it succeeded or failed
        setLoading(false);
    }
};

  return (
    <div className="lp-page">
      {/* Background blobs */}
      <div className="lp-blob lp-blob-1" />
      <div className="lp-blob lp-blob-2" />
      <div className="lp-blob lp-blob-3" />

      <div className="lp-card">
        {/* Header */}
        <div className="lp-header">
          <div className="lp-logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" opacity="0.6"/>
            </svg>
          </div>
          <h1 className="lp-title">Welcome Back</h1>
          <p className="lp-subtitle">Sign in to continue your learning journey</p>
        </div>

        {/* Form */}
        <form className="lp-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="lp-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Email */}
          <div className="lp-field">
            <label htmlFor="lp-email" className="lp-label">Email Address</label>
            <div className="lp-input-wrap">
              <span className="lp-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 8l10 6 10-6"/>
                </svg>
              </span>
              <input
                id="lp-email"
                type="email"
                name="email"
                className="lp-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="lp-field">
            <label htmlFor="lp-password" className="lp-label">Password</label>
            <div className="lp-input-wrap">
              <span className="lp-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <input
                id="lp-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="lp-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="lp-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="lp-forgot">
            <Link to="#" className="lp-forgot-link">Forgot password?</Link>
          </div>

          {/* Submit */}
          <button type="submit" className="lp-submit-btn" disabled={loading}>
            {loading ? (
              <span className="lp-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="lp-divider"><span>or</span></div>

        {/* Social placeholders */}
        <div className="lp-social">
          <button className="lp-social-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="lp-footer">
          Don't have an account?{' '}
          <Link to="/register-tutor" className="lp-register-link">Register as a Tutor</Link>
        </p>

        <p className="lp-back">
          <Link to="/" className="lp-back-link">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
