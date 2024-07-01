// src/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For demonstration, not removing remembered credentials to keep them for auto-fill
    // Only remove the session-specific data

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>This is the protected Dashboard page.</p>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default Dashboard;
