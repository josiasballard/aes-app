// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import DashboardLayout from './pages/Dashboard/Dashboard';
import DashboardHome from './pages/Dashboard/DashboardHome';
import Onboarding from './pages/Onboarding/Onboarding';
import TimeManagement from './pages/TimeManagement/TimeManagement';
import NewTimeSubmission from './pages/TimeManagement/NewTimeSubmission';
import CompanySettings from './pages/Settings/CompanySettings';
import UserSettings from './pages/Settings/UserSettings';

// Job-related pages nested under dashboard
import JobListHome from './pages/JobLists/JobListHome';
import JobDetail from './pages/JobLists/JobDetail';
import JobForm from './pages/JobLists/JobForm';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="time-management" element={<TimeManagement />} />
          <Route path="time-management/new" element={<NewTimeSubmission />} />
          {/* Job routes nested under dashboard */}
          <Route path="job-lists" element={<JobListHome />} />
          <Route path="job-lists/new" element={<JobForm />} />
          <Route path="job-lists/:jobId" element={<JobDetail />} />
          {/* Settings can also be nested if you wish */}
          <Route path="settings/company" element={<CompanySettings />} />
          <Route path="settings/user" element={<UserSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
