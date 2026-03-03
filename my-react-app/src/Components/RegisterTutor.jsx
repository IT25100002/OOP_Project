import React, { useState } from 'react';
import './RegisterTutor.css';
import axios from 'axios';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  qualification: '',
  experience: '',
  bio: '',
  password: '',
  confirmPassword: '',
};

function RegisterTutor() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validate = () => {
    const { firstName, lastName, email, phone, subject, qualification, experience, password, confirmPassword } = form;
    if (!firstName.trim() || !lastName.trim()) return 'First and last name are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
    if (!/^\+?[0-9]{7,15}$/.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number.';
    if (!subject.trim()) return 'Subject specialisation is required.';
    if (!qualification.trim()) return 'Highest qualification is required.';
    if (!experience || isNaN(experience) || Number(experience) < 0) return 'Please enter valid years of experience.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);
  setError('');

  const payload = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    subject: form.subject.trim(),
    qualification: form.qualification.trim(),
    experienceYears: Number(form.experience),
    bio: form.bio.trim(),
    password: form.password,
  };

  try {
    
    const response = await axios.post("http://localhost:8080/tutor/register", payload);

    
    console.log('Server response:', response.data);

    setSuccess(true)
    setForm(initialForm);
  } catch (err) {
    // Axios error handling: access the server message if it exists
    const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  if (success) {
    return (
      <div className="rt-page">
        <div className="rt-success-card">
          <div className="rt-success-icon">✓</div>
          <h2>Registration Successful!</h2>
          <p>Welcome aboard! Your tutor profile has been submitted for review. You'll receive a confirmation email shortly.</p>
          <button className="rt-btn-primary" onClick={() => setSuccess(false)}>
            Register Another Tutor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rt-page">
      <div className="rt-container">
        {/* Header */}
        <div className="rt-header">
          <div className="rt-badge">Tutor Registration</div>
          <h1 className="rt-title">Join Our Teaching Network</h1>
          <p className="rt-subtitle">
            Register as a tutor and connect with students across the organisation.
          </p>
        </div>

        {/* Form Card */}
        <form className="rt-card" onSubmit={handleSubmit} noValidate>
          {/* Personal Information */}
          <section className="rt-section">
            <h2 className="rt-section-title">
              <span className="rt-step">01</span> Personal Information
            </h2>
            <div className="rt-grid-2">
              <div className="rt-field">
                <label htmlFor="firstName">First Name <span className="rt-required">*</span></label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. Alex"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="rt-field">
                <label htmlFor="lastName">Last Name <span className="rt-required">*</span></label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Johnson"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="rt-grid-2">
              <div className="rt-field">
                <label htmlFor="email">Email Address <span className="rt-required">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="rt-field">
                <label htmlFor="phone">Phone Number <span className="rt-required">*</span></label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          <div className="rt-divider" />

          {/* Professional Details */}
          <section className="rt-section">
            <h2 className="rt-section-title">
              <span className="rt-step">02</span> Professional Details
            </h2>
            <div className="rt-grid-2">
              <div className="rt-field">
                <label htmlFor="subject">Subject Specialisation <span className="rt-required">*</span></label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="rt-field">
                <label htmlFor="qualification">Highest Qualification <span className="rt-required">*</span></label>
                <select
                  id="qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select qualification</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD / Doctorate</option>
                  <option value="diploma">Diploma / Certificate</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="rt-field rt-field--half">
              <label htmlFor="experience">Years of Experience <span className="rt-required">*</span></label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                max="60"
                placeholder="e.g. 5"
                value={form.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div className="rt-field">
              <label htmlFor="bio">Short Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Tell students a little about yourself, your teaching style, and your achievements..."
                value={form.bio}
                onChange={handleChange}
              />
            </div>
          </section>

          <div className="rt-divider" />

          {/* Account Security */}
          <section className="rt-section">
            <h2 className="rt-section-title">
              <span className="rt-step">03</span> Account Security
            </h2>
            <div className="rt-grid-2">
              <div className="rt-field">
                <label htmlFor="password">Password <span className="rt-required">*</span></label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="rt-field">
                <label htmlFor="confirmPassword">Confirm Password <span className="rt-required">*</span></label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Error Banner */}
          {error && (
            <div className="rt-error" role="alert">
              <span className="rt-error-icon">!</span>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="rt-actions">
            <button
              type="button"
              className="rt-btn-secondary"
              onClick={() => { setForm(initialForm); setError(''); }}
              disabled={loading}
            >
              Clear Form
            </button>
            <button type="submit" className="rt-btn-primary" disabled={loading}>
              {loading ? (
                <span className="rt-spinner" />
              ) : (
                'Register as Tutor'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterTutor;
