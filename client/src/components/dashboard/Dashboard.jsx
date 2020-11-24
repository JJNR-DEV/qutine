import React from 'react';
import { Redirect } from "react-router-dom";
import './Dashboard.css';
import HabitsDesktop from './HabitsDesktop';
import GoalsDesktop from './GoalsDesktop';

const Dashboard = () => {
  const authenticate = localStorage.getItem('user');
  if (authenticate === null) {
    return <Redirect to={'/login'} />
  }

  return (
    <div className="dashboard">
      <HabitsDesktop />
      <GoalsDesktop />
    </div>
    )
};

export default Dashboard;
