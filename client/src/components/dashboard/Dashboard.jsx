import React from 'react';
import './Dashboard.css';
import HabitsDesktop from './habits-desktop/HabitsDesktop';
import GoalsDesktop from './goals-desktop/GoalsDesktop';

const Dashboard = () => (
  <div className="dashboard">
    <HabitsDesktop />
    <GoalsDesktop />
  </div>
);

export default Dashboard;
