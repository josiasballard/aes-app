// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Welcome to Bravari</h1>
      <p>Your productivity hub for construction companies.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login" className="btn btn-primary" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
