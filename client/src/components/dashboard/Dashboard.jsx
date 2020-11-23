import React from 'react';
import './Dashboard.css';
import HabitsDesktop from './HabitsDesktop';
import GoalsDesktop from './GoalsDesktop';

const Dashboard = () => (
  <div className="dashboard">
    <HabitsDesktop />
    <GoalsDesktop />
  </div>
);

export default Dashboard;
