import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu  = () => setMenuOpen(false);

  return (
    <nav className="navBar">
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>Logo</Link>

      {/* Desktop Links */}
      <ul className="navlinks">
        <li><NavLink to="/"       className={({ isActive }) => isActive ? 'active-link' : ''} end>Home</NavLink></li>
        <li><NavLink to="/tutors" className={({ isActive }) => isActive ? 'active-link' : ''}>Tutors</NavLink></li>
        <li><NavLink to="/support" className={({ isActive }) => isActive ? 'active-link' : ''}>Support</NavLink></li>
        <li><NavLink to="/Students" className={({ isActive }) => isActive ? 'active-link' : ''}>Student</NavLink></li>

      </ul>

      {/* Desktop Buttons */}
      <div className="navButtons">
        <Link to="/login" className="loginButton">Login</Link>
        <Link to="/register-tutor" className="registerButton">Register</Link>
      </div>

      {/* Hamburger Icon */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Drawer */}
      <div className={`mobileMenu ${menuOpen ? 'show' : ''}`}>
        <ul className="mobileLinks">
          <li><NavLink to="/"        onClick={closeMenu} end>Home</NavLink></li>
          <li><NavLink to="/tutors"  onClick={closeMenu}>Tutors</NavLink></li>
          <li><NavLink to="/support" onClick={closeMenu}>Support</NavLink></li>
        </ul>
        <div className="mobileButtons">
          <Link to="/login" className="loginButton" onClick={closeMenu}>Login</Link>
          <Link to="/register-tutor" className="registerButton" onClick={closeMenu}>Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;