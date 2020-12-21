import React from 'react';
import './Dashboard.css';
import HabitsDesktop from './habits-desktop/HabitsDesktop';
import SideBar from './SideBar';

const Dashboard = () => (
  <div className="dashboard">
    <SideBar />
    <HabitsDesktop />
  </div>
);

export default Dashboard;
