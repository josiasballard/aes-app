// src/pages/JobLists/JobDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/JobDetail.css';

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Job not found');
        }
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job detail:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [jobId]);

  if (loading) return <div>Loading job details...</div>;
  if (error) return (
    <div className="job-detail">
      <h2>Error: {error}</h2>
      {/* Use relative path to go back */}
      <Link to=".." className="back-link">Back to Job List</Link>
    </div>
  );

  if (!job) {
    return (
      <div className="job-detail">
        <h2>Job Not Found</h2>
        <Link to=".." className="back-link">Back to Job List</Link>
      </div>
    );
  }

  return (
    <div className="job-detail">
      {/* Use relative path ("..") to go back */}
      <Link to=".." className="back-link">← Back to Job List</Link>
      <h2>
        {job.job_year && job.job_year > 0 
          ? `${String(job.job_year).slice(-2)} - ${job.job_number}` 
          : job.job_number}
      </h2>
      <p><strong>Contractor:</strong> {job.contractor || "No Contractor"}</p>
      <p><strong>Location:</strong> {job.location || "No Location"}</p>
      <p><strong>Description:</strong> {job.job_description}</p>
      <p><strong>Permit Number:</strong> {job.permit_number || "N/A"}</p>
      <p>
        <strong>Date Started:</strong> {job.date_started ? new Date(job.date_started).toLocaleDateString() : "N/A"}
      </p>
      <p>
        <strong>Date Completed:</strong> {job.date_completed ? new Date(job.date_completed).toLocaleDateString() : "N/A"}
      </p>
    </div>
  );
}

export default JobDetail;
