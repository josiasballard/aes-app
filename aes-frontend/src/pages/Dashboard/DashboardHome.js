// src/pages/DashboardHome.js
import React, { useState } from 'react';
import TaskWidget from '../../widgets/TaskWidget';
import TimePeriodWidget from '../../widgets/TimePeriodWidget';
import CompanyThreadWidget from '../../widgets/CompanyThreadWidget';
import NotificationsWidget from '../../widgets/NotificationsWidget';
import './styles/DashboardHome.css';

function DashboardHome() {
  const today = new Date();
  const payPeriods = generatePayPeriods(today);

  // Find index, default to last period if none match
  let idx = payPeriods.findIndex(
    (period) => today >= period.start && today <= period.end
  );
  if (idx < 0) idx = payPeriods.length - 1;

  const [periodIndex, setPeriodIndex] = useState(idx);
  const currentPeriod = payPeriods[periodIndex];

  // Only split if we have a valid currentPeriod
  const { week1Summary, week2Summary } = currentPeriod
    ? splitSubmissionsByWeek(dummySubmissions, currentPeriod)
    : { week1Summary: {}, week2Summary: {} };

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <div className="dashboard-grid">
        <TaskWidget tasks={dummyTasks} />

        {currentPeriod && (
          <TimePeriodWidget
            week1Summary={week1Summary}
            week2Summary={week2Summary}
            payPeriods={payPeriods}
            periodIndex={periodIndex}
            setPeriodIndex={setPeriodIndex}
            currentPeriod={currentPeriod}
            formatDate={(d) =>
              new Date(d).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            }
          />
        )}

        <CompanyThreadWidget messages={dummyMessages} />
        <NotificationsWidget notifications={dummyNotifications} />
      </div>
    </div>
  );
}


// Helpers & Dummy Data

function generatePayPeriods(todayDate) {
  const periods = [];
  const firstStart = new Date('2024-01-07T12:00:00');
  let start = new Date(firstStart);
  const endLimit = new Date('2025-04-12T12:00:00');

  while (start <= endLimit) {
    const end = new Date(start);
    end.setDate(end.getDate() + 13);
    periods.push({ start: new Date(start), end: new Date(end) });
    start.setDate(start.getDate() + 14);
  }
  return periods;
}

function splitSubmissionsByWeek(subs, currentPeriod) {
  const parseDate = (s) => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d, 12);
  };
  const diffHours = (start, end) => {
    const p = (t) => {
      const [time, mer] = t.split(' ');
      let [h, min] = time.split(':').map(Number);
      if (mer === 'PM' && h !== 12) h += 12;
      if (mer === 'AM' && h === 12) h = 0;
      return h + min / 60;
    };
    return Math.round((p(end) - p(start)) * 4) / 4;
  };

  const w1s = new Date(currentPeriod.start);
  const w1e = new Date(currentPeriod.start);
  w1e.setDate(w1e.getDate() + 6);

  const w2s = new Date(currentPeriod.start);
  w2s.setDate(w2s.getDate() + 7);
  const w2e = new Date(currentPeriod.end);

  const week1 = [], week2 = [];
  subs.forEach((e) => {
    const dt = parseDate(e.date);
    if (dt >= w1s && dt <= w1e) week1.push(e);
    else if (dt >= w2s && dt <= w2e) week2.push(e);
  });

  const summarize = (arr) => {
    let total = 0, ot = 0, vac = 0, hol = 0;
    arr.forEach((e) => {
      const hrs = diffHours(e.start, e.end);
      total += hrs;
      if (e.wageType.toLowerCase() === 'overtime') ot += hrs;
      else if (e.wageType.toLowerCase() === 'vacation') vac += hrs;
      else if (e.wageType.toLowerCase() === 'holiday') hol += hrs;
    });
    return { Hours: total, Overtime: ot, Vacation: vac, Holiday: hol };
  };

  return { week1Summary: summarize(week1), week2Summary: summarize(week2) };
}

const dummySubmissions = [
  { date: '2025-03-28', contractor: 'Gene Schaffer', job: '25 - 002', address: '4704 Dornoch Ct', start: '06:30 AM', end: '04:30 PM', wageType: 'Hourly' },
  /* …more entries… */
];

const dummyTasks = [
  'Inspect site for safety compliance',
  'Order materials for foundation',
  'Schedule team meeting',
];

const dummyMessages = [
  { id: 1, text: 'Project kickoff meeting at 9am', sender: 'CEO' },
  /* …more… */
];

const dummyNotifications = [
  { id: 1, text: 'Task completed by John', read: false },
  /* …more… */
];

export default DashboardHome;
