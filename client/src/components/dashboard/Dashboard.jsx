import React from 'react';
import './Dashboard.css';
import HabitsDesktop from './habits-desktop/HabitsDesktop';
import GoalsDesktop from './goals-desktop/GoalsDesktop';
import DayRoutine from './day-routine/DayRoutine';

const Dashboard = () => (
  <div className="dashboard">
    <DayRoutine />
    <HabitsDesktop />
    <GoalsDesktop />
  </div>
);

export default Dashboard;
