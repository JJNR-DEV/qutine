import React from 'react';
// import DayRoutine from './day-routine/DayRoutine';
import GoalsDesktop from './goals-desktop/GoalsDesktop';
import Profile from './Profile';
import logo from '../../logo.png';

const SideBar = () => {

  return (
    <div className="sideBar">
      <img className="logo" src={logo} alt="logo"/>
      <Profile />
      <span className='borderBottomSpanFixed'></span>
      <div className='sideBarScrollContainer'>
      <GoalsDesktop />
      {/* <span className='borderBottomSpan'></span>
      {<DayRoutine />
      <span className='borderBottomSpan'></span>} */}
      </div>
    </div>
  );
};

export default SideBar;
