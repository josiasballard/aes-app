// src/widgets/TimePeriodWidget.js
import React from 'react';
import PayPeriodNavigation from '../components/PayPeriodNavigation';
import './styles/TimePeriodWidget.css';

function TimePeriodWidget({ week1Summary = {}, week2Summary = {}, payPeriods = [], periodIndex = 0, setPeriodIndex, currentPeriod, formatDate }) {
  const renderSummary = (summary, label) => {
    const safeSummary = {
      Hours: 0,
      Overtime: 0,
      Vacation: 0,
      Holiday: 0,
      ...summary,
    };

    return (
      <div className="summary-card">
        <h3 className="summary-heading">{label} Summary</h3>
        <div className="summary-values">
          {Object.entries(safeSummary).map(([key, value]) => (
            <div key={key} className="summary-item">
              <h4 className="summary-title">{key}</h4>
              <p className="summary-value">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="time-period-widget">
      {currentPeriod && (
        <div className="navigation-container">
          <PayPeriodNavigation
            currentPeriod={currentPeriod}
            periodIndex={periodIndex}
            setPeriodIndex={setPeriodIndex}
            payPeriods={payPeriods}
            formatDate={formatDate}
          />
        </div>
      )}
      {renderSummary(week1Summary, 'Week 1')}
      {renderSummary(week2Summary, 'Week 2')}
    </div>
  );
}

export default TimePeriodWidget;
