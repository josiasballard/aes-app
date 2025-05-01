// src/pages/UserSettings.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserSettings() {
  const [username, setUsername] = useState("Current Username");
  const [email, setEmail] = useState("user@example.com");

  const handleSave = (e) => {
    e.preventDefault();
    alert("User settings saved!");
  };

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div className="glass-card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h1 className="text-center mb-2">User Settings</h1>
        <form onSubmit={handleSave}>
          <div className="mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Save Settings
          </button>
        </form>
        <div className="text-center mt-2">
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
