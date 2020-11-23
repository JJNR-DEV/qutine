import React, { useState } from 'react';
import './dashboard.css';
import HabitsDesktop from './HabitsDesktop';
import GoalsDesktop from './GoalsDesktop';

const Dashboard = () => {

  return (
    <div className='dashboard'>
      <HabitsDesktop />
      <GoalsDesktop />
    </div>
  );
};

export default Dashboard;
