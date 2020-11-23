import React, { useState } from 'react';
import './landingPage.css';

const LandingPage = () => {
  return (
    <div className="landingPage">
      <img className='logo' src={require('../../logo-removebg-preview copy.png').default} alt='logo' />
      <div className='welcomeMessage'>
      <h1>Welcome to qutine!</h1>
      <p>Routine for your quarantine.</p>
      </div>
      <div className='landingPageButtonsContainer'>
        <button className='landingPageButtons registerButton'>Register</button>
        <button className='landingPageButtons logInButton'>Log in</button>
      </div>
    </div>
  );
}

export default LandingPage;
