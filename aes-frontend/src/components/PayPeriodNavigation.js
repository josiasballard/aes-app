// src/components/PayPeriodNavigation.js
import React from 'react';
import './styles/PayPeriodNavigation.css';

function PayPeriodNavigation({ currentPeriod, periodIndex, payPeriods, setPeriodIndex, formatDate }) {
  if (!currentPeriod) return null; // Prevent rendering if currentPeriod is missing

  return (
    <div className="pay-period-nav">
      <button
        className="btn btn-primary nav-arrow"
        style={{ visibility: periodIndex === 0 ? 'hidden' : 'visible' }}
        onClick={() => setPeriodIndex(periodIndex - 1)}
      >
        &lt;
      </button>
      <span className="pay-period-range">
        {formatDate(currentPeriod.start)} — {formatDate(currentPeriod.end)}
      </span>
      <button
        className="btn btn-primary nav-arrow"
        style={{ visibility: periodIndex === payPeriods.length - 1 ? 'hidden' : 'visible' }}
        onClick={() => setPeriodIndex(periodIndex + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default PayPeriodNavigation;
