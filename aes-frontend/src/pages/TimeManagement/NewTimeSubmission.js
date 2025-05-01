// src/pages/TimeManagement/NewTimeSubmission.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NewTimeSubmission.css';

function NewTimeSubmission() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [job, setJob] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [contractor, setContractor] = useState('');
  const [address, setAddress] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [wageType, setWageType] = useState('');
  const navigate = useNavigate();

  // Dummy job list
  const dummyJobs = [
    { job: '25 - 002', contractor: 'Gene Schaffer', address: '4704 Dornoch Ct' },
    { job: '25 - 001', contractor: 'Gene Schaffer', address: '4700 Dornoch Ct' },
    // ... add more dummy jobs as needed
  ];

  // Filter jobs based on search query (case-insensitive, max 10 results)
  const filteredJobs = dummyJobs
    .filter(jobItem =>
      jobItem.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobItem.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobItem.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 10);

  // Calculate total hours based on time input (using 24-hr format from <input type="time">)
  const getTotalHours = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const diff = (endHours + endMinutes / 60) - (startHours + startMinutes / 60);
    return Math.round(diff * 4) / 4;
  };

  const handleJobSelect = (selectedJob) => {
    setJob(selectedJob.job);
    setContractor(selectedJob.contractor);
    setAddress(selectedJob.address);
    setSearchQuery(''); // Clear search query after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmission = {
      name,
      date,
      job,
      contractor,
      address,
      start,
      end,
      wageType,
      totalHours: getTotalHours(start, end),
    };
    console.log('New Time Submission:', newSubmission);
    // Here you would typically send the data to your backend
    navigate('/dashboard/time-management');
  };

  const handleCancel = () => {
    navigate('/dashboard/time-management');
  };

  return (
    <div className="new-time-submission-container">
      <h2>New Time Submission</h2>
      <form onSubmit={handleSubmit} className="time-submission-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs..."
          />
          {searchQuery && filteredJobs.length > 0 && (
            <ul className="job-search-list">
              {filteredJobs.map((jobItem, index) => (
                <li
                  key={index}
                  onClick={() => handleJobSelect(jobItem)}
                  className="job-search-item"
                >
                  <strong>{jobItem.job}</strong> - {jobItem.contractor} ({jobItem.address})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label>Job #</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contractor</label>
          <input
            type="text"
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Wage Type</label>
          <select value={wageType} onChange={(e) => setWageType(e.target.value)} required>
            <option value="">Select Wage Type</option>
            <option value="Hourly">Hourly</option>
            <option value="Overtime">Overtime</option>
            <option value="Vacation">Vacation</option>
            <option value="Holiday">Holiday</option>
          </select>
        </div>
        <div className="form-group">
          <label>Total Hours</label>
          <input
            type="text"
            value={getTotalHours(start, end)}
            readOnly
            placeholder="Calculated automatically"
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTimeSubmission;
