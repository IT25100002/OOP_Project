import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TutorsPage.css';

const API_URL = 'http://localhost:8080/tutor/getAllTutors';

// Color palette cycled per tutor
const COLORS = ['#6c63ff', '#00bfa5', '#f06292', '#ffb300', '#42a5f5', '#ef5350', '#ab47bc', '#26a69a'];

function getColor(index) {
  return COLORS[index % COLORS.length];
}

function getInitials(tutor) {
  const first = (tutor.firstName || tutor.name || '?').charAt(0);
  const last  = (tutor.lastName  || '').charAt(0);
  return (first + last).toUpperCase();
}

// ── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  if (!rating && rating !== 0) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="tp-stars" aria-label={`Rating: ${rating}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)           return <span key={i} className="tp-star filled">★</span>;
        if (i === full && half) return <span key={i} className="tp-star half">★</span>;
        return                         <span key={i} className="tp-star">★</span>;
      })}
      <span className="tp-rating-num">{rating}</span>
    </span>
  );
}

// ── Tutor Card ─────────────────────────────────────────────────────────────
function TutorCard({ tutor, index }) {
  const color    = getColor(index);
  const initials = getInitials(tutor);
  const fullName = tutor.firstName && tutor.lastName
    ? `${tutor.firstName} ${tutor.lastName}`
    : (tutor.name || 'Unknown');

  return (
    <article className="tp-card">
      <div className="tp-card-avatar" style={{ background: color }}>
        {initials}
      </div>

      <h3 className="tp-card-name">{fullName}</h3>
      <p className="tp-card-subject">{tutor.subject || tutor.subjectSpecialisation || '—'}</p>
      <p className="tp-card-qual">{tutor.qualification || tutor.highestQualification || ''}</p>
      <p className="tp-card-bio">{tutor.bio || tutor.shortBio || 'No bio available.'}</p>

      <div className="tp-card-meta">
        {(tutor.experienceYears ?? tutor.experience) !== undefined && (
          <span className="tp-meta-item">
            <span className="tp-meta-icon">🎓</span>
            {tutor.experienceYears ?? tutor.experience} yrs exp
          </span>
        )}
        {tutor.email && (
          <span className="tp-meta-item">
            <span className="tp-meta-icon">✉️</span>
            {tutor.email}
          </span>
        )}
      </div>

      {tutor.rating !== undefined && <StarRating rating={tutor.rating} />}

      <button className="tp-card-btn">View Profile</button>
    </article>
  );
}

// ── Loading Skeleton ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="tp-card tp-skeleton">
      <div className="sk-avatar" />
      <div className="sk-line sk-lg" />
      <div className="sk-line sk-md" />
      <div className="sk-line sk-sm" />
      <div className="sk-line sk-full" />
      <div className="sk-line sk-full" />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
function TutorsPage() {
  const [tutors,  setTutors]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        // Handle both array response and { data: [...] } wrapper
        const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setTutors(data);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to load tutors. Please try again later.';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tp-page">

      {/* ── Hero Banner ── */}
      <section className="tp-hero">
        <div className="tp-hero-content">
          <span className="tp-hero-tag">Our Educators</span>
          <h1 className="tp-hero-title">Meet Our Expert Tutors</h1>
          <p className="tp-hero-subtitle">
            Learn from passionate, qualified professionals dedicated to your success.
            Browse our handpicked tutors and start your learning journey today.
          </p>
          <div className="tp-hero-actions">
            <Link to="/login" className="tp-login-btn">
              → Login
            </Link>
            <Link to="/register-tutor" className="tp-register-btn">
              ✦ Register as a Tutor
            </Link>
            {!loading && !error && (
              <span className="tp-hero-count">{tutors.length} Active Tutors</span>
            )}
          </div>
        </div>
        <div className="tp-hero-shapes">
          <div className="tp-shape tp-shape-1" />
          <div className="tp-shape tp-shape-2" />
          <div className="tp-shape tp-shape-3" />
        </div>
      </section>

      
      {/* <section className="tp-filter-bar">
        <div className="tp-filter-inner">
          <span className="tp-filter-label">Filter by subject:</span>
          <div className="tp-filter-tags">
            {['All', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science', 'History'].map(tag => (
              <button key={tag} className={`tp-filter-tag ${tag === 'All' ? 'active' : ''}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Tutor Cards Grid ── */}
      <section className="tp-grid-section">
        {/* Error state */}
        {error && (
          <div className="tp-api-error">
            <span className="tp-api-error-icon">⚠</span>
            <p>{error}</p>
          </div>
        )}

        <div className="tp-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : tutors.map((tutor, i) => (
                <TutorCard key={tutor.id ?? tutor.tutorId ?? i} tutor={tutor} index={i} />
              ))
          }
        </div>

        {!loading && !error && tutors.length === 0 && (
          <p className="tp-empty">No tutors found. Be the first to register!</p>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="tp-cta">
        <div className="tp-cta-content">
          <h2>Are you an expert in your field?</h2>
          <p>Join our growing network of educators and make a difference.</p>
          <Link to="/register-tutor" className="tp-register-btn tp-register-btn--dark">
            Register as a Tutor →
          </Link>
        </div>
      </section>

    </div>
  );
}

export default TutorsPage;
