import React from 'react';
import DayRoutine from './day-routine/DayRoutine';
import GoalsDesktop from './goals-desktop/GoalsDesktop';
import Profile from './Profile';

const SideBar = () => {

  return (
    <div className="sideBar">
      <div className='sideBarScrollContainer'>
      <Profile />
      <span className='borderBottomSpan'></span>
      <GoalsDesktop />
      <span className='borderBottomSpan'></span>
      <DayRoutine />
      <span className='borderBottomSpan'></span>
      </div>
    </div>
  );
};

export default SideBar;
