// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.4)',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000
    }}>
      <div className="navbar-brand">
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
          Bravari
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard" style={{ marginRight: '1rem', color: '#fff' }}>Dashboard</Link>
        <Link to="/settings/company" style={{ marginRight: '1rem', color: '#fff' }}>Company Settings</Link>
        <Link to="/settings/user" style={{ color: '#fff' }}>User Settings</Link>
      </div>
    </nav>
  );
}

export default Navigation;
