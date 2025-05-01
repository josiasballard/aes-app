// src/components/TimeSubmissionList.js
import React from 'react';
import './styles/TimeSubmissionList.css';

function TimeSubmissionList({ submissions, formatDate, getTotalHours }) {
  if (!Array.isArray(submissions)) return null;

  return (
    <div className="time-submissions">
      {submissions.map((submission, index) => (
        <div key={index} className="submission-card">
          <div className="submission-header">
            <h4>{formatDate(submission.date)}</h4>
            <button className="btn btn-primary">Edit</button>
          </div>
          <div className="submission-grid">
            <div className="submission-group">
              <p><strong>Job #:</strong> {submission.job}</p>
              <p><strong>Contractor:</strong> {submission.contractor}</p>
              <p><strong>Address:</strong> {submission.address}</p>
            </div>
            <div className="submission-group">
              <p><strong>Start Time:</strong> {submission.start}</p>
              <p><strong>End Time:</strong> {submission.end}</p>
            </div>
            <div className="submission-group">
              <p><strong>Wage Type:</strong> {submission.wageType}</p>
              <p><strong>Total Hours:</strong> {getTotalHours(submission.start, submission.end)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimeSubmissionList;
