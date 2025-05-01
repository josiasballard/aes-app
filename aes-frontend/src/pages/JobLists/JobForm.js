// src/pages/JobLists/JobForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/JobForm.css';

function JobForm() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    job_year: currentYear,      // Default to current year
    job_number: '',             // Will be auto-filled based on max job number
    job_description: '',
    contractor: '',
    location: '',
    permit_number: '',
    date_started: '',
    date_completed: '',
    hero_image: '',             // Field for hero image URL
    uploaded_images: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contractors, setContractors] = useState([]);

  // Fetch all jobs to derive a unique list of contractors (no hard-coded values)
  useEffect(() => {
    fetch('/jobs')
      .then((res) => res.json())
      .then((data) => {
        const uniqueContractors = Array.from(
          new Set(data.map(job => job.contractor).filter(Boolean).map(name => name.trim()))
        );
        setContractors(uniqueContractors);
      })
      .catch((err) => console.error("Error fetching contractors:", err));
  }, []);

  // When job_year changes (or on mount) and job_number is empty, fetch the max job number for that year.
  useEffect(() => {
    if (formData.job_year && (!formData.job_number || formData.job_number.trim() === "")) {
      console.log("Fetching max job number for year:", formData.job_year);
      fetch(`/jobs/max?year=${formData.job_year}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch max job number');
          }
          return res.json();
        })
        .then(data => {
          console.log("Max job number data:", data);
          // If data.maxNumber is null, use 0; otherwise, parse it as an integer.
          const currentMax = data.maxNumber !== null ? parseInt(data.maxNumber, 10) : 0;
          const nextNumber = (currentMax + 1).toString().padStart(3, '0');
          console.log("Setting job_number to:", nextNumber);
          setFormData(prev => ({ ...prev, job_number: nextNumber }));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [formData.job_year, formData.job_number]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create job');
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        // Navigate back one level (e.g., from /dashboard/job-lists/new to /dashboard/job-lists)
        navigate('..');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="job-form-container">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div>
          <label>Job Year:</label>
          <input
            type="number"
            name="job_year"
            value={formData.job_year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Job Number:</label>
          <input
            type="text"
            name="job_number"
            value={formData.job_number}
            onChange={handleChange}
            placeholder="e.g., 001"
          />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contractor:</label>
          <input
            type="text"
            name="contractor"
            list="contractors"
            value={formData.contractor}
            onChange={handleChange}
          />
          <datalist id="contractors">
            {contractors.map(name => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>
        <div>
          <label>Permit Number:</label>
          <input
            type="text"
            name="permit_number"
            value={formData.permit_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date Started:</label>
          <input
            type="date"
            name="date_started"
            value={formData.date_started}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date Completed:</label>
          <input
            type="date"
            name="date_completed"
            value={formData.date_completed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Hero Image URL:</label>
          <input
            type="text"
            name="hero_image"
            value={formData.hero_image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Job'}
        </button>
      </form>
      <Link to=".." className="back-link">← Back to Job List</Link>
    </div>
  );
}

export default JobForm;
