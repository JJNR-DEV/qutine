import React from 'react';
import GoalsDesktop from './goals-desktop/GoalsDesktop';
import Profile from './Profile';
import logo from '../../images/logo.png';

const SideBar = () => {

  return (
    <div className="sideBar">
      <img className="logo" src={logo} alt="logo"/>
      <Profile />
      <span className='borderBottomSpanFixed'/>
      <div className='sideBarScrollContainer'>
      <GoalsDesktop />
      </div>
    </div>
  );
};

export default SideBar;
