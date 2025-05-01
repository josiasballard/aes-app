// src/pages/Signup.js
import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div className="glass-card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h1 className="text-center mb-2">Sign Up</h1>
        <form>
          <div className="mb-2">
            <input type="text" className="form-control" placeholder="Name" required />
          </div>
          <div className="mb-2">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-2">
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
