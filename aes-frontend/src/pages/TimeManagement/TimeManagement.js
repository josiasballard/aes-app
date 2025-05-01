// src/pages/TimeManagement/TimeManagement.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPeriodNavigation from '../../components/PayPeriodNavigation';
import TimeSummary from '../../components/TimeSummary';

function TimeManagement() {
  const navigate = useNavigate();
  const today = new Date();
  const payPeriods = generatePayPeriods(today);
  const currentPeriodIndex = payPeriods.findIndex(
    (period) => today >= period.start && today <= period.end
  );
  const [periodIndex, setPeriodIndex] = useState(currentPeriodIndex);

  function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 12); // Noon to avoid timezone issues
  }

  function formatDate(dateInput) {
    const date = typeof dateInput === 'string'
      ? parseLocalDate(dateInput)
      : new Date(dateInput);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  function formatWithWeekday(dateInput) {
    const date = typeof dateInput === 'string'
      ? parseLocalDate(dateInput)
      : new Date(dateInput);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const dummySubmissions = [
    { date: '2025-03-28', contractor: 'Gene Schaffer', job: '25 - 002', address: '4704 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-27', contractor: 'Gene Schaffer', job: '25 - 002', address: '4703 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-26', contractor: 'Gene Schaffer', job: '25 - 002', address: '4702 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-25', contractor: 'Gene Schaffer', job: '25 - 002', address: '4701 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-24', contractor: 'Gene Schaffer', job: '25 - 002', address: '4700 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-21', contractor: 'Gene Schaffer', job: '25 - 001', address: '4704 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-20', contractor: 'Gene Schaffer', job: '25 - 001', address: '4703 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-19', contractor: 'Gene Schaffer', job: '25 - 001', address: '4702 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-18', contractor: 'Gene Schaffer', job: '25 - 001', address: '4701 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
    { date: '2025-03-17', contractor: 'Gene Schaffer', job: '25 - 001', address: '4700 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' }
  ];

  const currentPeriod = payPeriods[periodIndex];

  function generatePayPeriods(todayDate) {
    const periods = [];
    const firstPeriodStart = new Date('2024-01-07T12:00:00');
    let start = new Date(firstPeriodStart);
    const currentPayPeriodEnd = new Date('2025-04-12T12:00:00');
    while (start <= currentPayPeriodEnd) {
      const end = new Date(start);
      end.setDate(start.getDate() + 13);
      periods.push({ start: new Date(start), end: new Date(end) });
      start.setDate(start.getDate() + 14);
    }
    return periods;
  }

  function getTotalHours(startTime, endTime) {
    const parse = (t) => {
      const [time, meridian] = t.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (meridian === 'PM' && hours !== 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;
      return hours + minutes / 60;
    };
    const diff = parse(endTime) - parse(startTime);
    return Math.round(diff * 4) / 4;
  }

  const sortedSubmissions = [...dummySubmissions].sort((a, b) => {
    const dateA = parseLocalDate(a.date);
    const dateB = parseLocalDate(b.date);
    return dateB - dateA;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#000000', fontSize: '1.8rem' }}>
          Time Management Overview
        </h2>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/time-management/new')}>+ Add Time Submission</button>
      </div>
      <PayPeriodNavigation
        currentPeriod={currentPeriod}
        periodIndex={periodIndex}
        setPeriodIndex={setPeriodIndex}
        payPeriods={payPeriods}
        formatDate={formatDate}
      />
      <TimeSummary
        submissions={sortedSubmissions}
        currentPeriod={currentPeriod}
        parseLocalDate={parseLocalDate}
        getTotalHours={getTotalHours}
        formatDate={formatWithWeekday}
      />
    </div>
  );
}

export default TimeManagement;
