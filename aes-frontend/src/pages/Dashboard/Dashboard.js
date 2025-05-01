// src/pages/Dashboard/Dashboard.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/Dashboard.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="company-sidebar">
        <div className="sidebar-brand">
          <h2>Bravari</h2>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>
              <NavLink end to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/onboarding" className={({ isActive }) => (isActive ? 'active' : '')}>
                Onboarding
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/time-management" className={({ isActive }) => (isActive ? 'active' : '')}>
                Time Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/job-lists" className={({ isActive }) => (isActive ? 'active' : '')}>
                Job Lists
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/employee-benefits" className={({ isActive }) => (isActive ? 'active' : '')}>
                Employee Benefits
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/company-resources" className={({ isActive }) => (isActive ? 'active' : '')}>
                Company Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/employee-directory" className={({ isActive }) => (isActive ? 'active' : '')}>
                Employee Directory
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="dashboard-main">
        <header className="company-header">
          <h1>Advanced Electrical Solutions</h1>
        </header>
        <div className="dashboard-content">
          {/* Nested routes will be rendered here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
