// src/pages/JobLists/JobListHome.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/JobListHome.css';

function JobListHome() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    fetch('/jobs')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  const years = Array.from(new Set(jobs.map(job => job.job_year)));

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.trim().toLowerCase();
    const composite = `${job.job_year || ''} ${job.job_number || ''} ${job.contractor || ''} ${job.location || ''}`.toLowerCase();
    const matchesQuery = query === "" || composite.includes(query);
    const matchesYear = selectedYear === 'all' || job.job_year === parseInt(selectedYear, 10);
    return matchesQuery && matchesYear;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const aYear = a.job_year;
    const bYear = b.job_year;
    const aHasYear = aYear && typeof aYear === 'number' && aYear > 0;
    const bHasYear = bYear && typeof bYear === 'number' && bYear > 0;

    if (aHasYear && bHasYear) {
      if (aYear !== bYear) {
        return bYear - aYear;
      } else {
        const aNum = parseInt(a.job_number, 10);
        const bNum = parseInt(b.job_number, 10);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return bNum - aNum;
        } else {
          return b.job_number.localeCompare(a.job_number);
        }
      }
    } else if (aHasYear) {
      return -1;
    } else if (bHasYear) {
      return 1;
    } else {
      const aNum = parseInt(a.job_number, 10);
      const bNum = parseInt(b.job_number, 10);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return bNum - aNum;
      } else {
        return b.job_number.localeCompare(a.job_number);
      }
    }
  });

  return (
    <div className="job-list-home">
      <div className="job-list-header">
        <h2 className="job-list-title">Job Listings</h2>
        {/* Use a relative path so it appends to the current route */}
        <Link to="new" className="add-job-button">+ Add New Job</Link>
      </div>
      <div className="job-list-controls">
        <input
          type="text"
          placeholder="Search by job number, contractor, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="job-search"
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="job-filter"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="job-grid">
        {sortedJobs.map(job => (
          // Use a relative path here so the URL becomes "/dashboard/job-lists/{job.id}"
          <Link to={`${job.id}`} key={job.id} className="job-card">
            <div className="job-card-header">
              {job.job_year && typeof job.job_year === 'number' && job.job_year > 0
                ? `${String(job.job_year).slice(-2)} - ${job.job_number}`
                : job.job_number}
            </div>
            <div className="job-card-body">
              <p className="job-contractor">{job.contractor || "No Contractor"}</p>
              <p className="job-location">{job.location || "No Location"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JobListHome;
