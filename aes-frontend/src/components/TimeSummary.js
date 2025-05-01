// src/components/TimeSummary.js
import React from 'react';
import './styles/TimeSummary.css';
import TimeSubmissionList from './TimeSubmissionList';

function TimeSummary({ submissions, currentPeriod, parseLocalDate, getTotalHours, formatDate }) {
  // Week boundaries
  const week1Start = new Date(currentPeriod.start);
  const week1End = new Date(currentPeriod.start);
  week1End.setDate(week1End.getDate() + 6);

  const week2Start = new Date(currentPeriod.start);
  week2Start.setDate(week2Start.getDate() + 7);
  const week2End = new Date(currentPeriod.end);

  // Filter subs by week
  const filterByWeek = (start, end) =>
    submissions.filter((sub) => {
      const date = parseLocalDate(sub.date);
      return date >= start && date <= end;
    });

  const summarize = (entries) => {
    let total = 0, overtime = 0, vacation = 0, holiday = 0;
    entries.forEach((entry) => {
      const hours = getTotalHours(entry.start, entry.end);
      total += hours;
      const type = entry.wageType.toLowerCase();
      if (type === 'overtime') overtime += hours;
      else if (type === 'vacation') vacation += hours;
      else if (type === 'holiday') holiday += hours;
    });
    return { Hours: total, Overtime: overtime, Vacation: vacation, Holiday: holiday };
  };

  const week1Subs = filterByWeek(week1Start, week1End);
  const week2Subs = filterByWeek(week2Start, week2End);
  const week1Summary = summarize(week1Subs);
  const week2Summary = summarize(week2Subs);

  const renderSection = (label, summary, subs) => (
    <div className="week-section">
      <h3>{label} Summary</h3>
      <div className="time-summary">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="summary-card">
            <h4>{key}</h4>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <h4 className="submission-label">{label} Submissions</h4>
      <TimeSubmissionList
        submissions={subs}
        formatDate={formatDate}
        getTotalHours={getTotalHours}
      />
    </div>
  );

  return (
    <div>
      {renderSection('Week 2', week2Summary, week2Subs)}
      {renderSection('Week 1', week1Summary, week1Subs)}
    </div>
  );
}

export default TimeSummary;
