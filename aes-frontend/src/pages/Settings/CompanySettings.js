// src/pages/CompanySettings.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CompanySettings() {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Company settings saved!');
  };

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div className="glass-card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h1 className="text-center mb-2">Company Settings</h1>
        <h2>Update Company Logo</h2>
        {logo ? (
          <div>
            <img src={logo} alt="Company Logo" style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} />
          </div>
        ) : (
          <p>No logo uploaded.</p>
        )}
        <input type="file" accept="image/*" onChange={handleLogoChange} className="form-control" />
        <button className="btn btn-primary w-100 mt-2" onClick={handleSave}>
          Save Changes
        </button>
        <div className="text-center mt-2">
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default CompanySettings;
