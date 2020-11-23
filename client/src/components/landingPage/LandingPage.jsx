import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => (
  <div className="landingPage">
    <img className="logo" src={require('../../logo-removebg-preview copy.png').default} alt="logo" />
    <div className="welcomeMessage">
      <h1>Welcome to qutine!</h1>
      <p>Routine for your quarantine.</p>
    </div>
    <div className="landingPageButtonsContainer">
      <Link to="/register" className="landingPageButtons registerButton">Register</Link>
      <Link to="/login" className="landingPageButtons logInButton">Log in</Link>
    </div>
  </div>
);

export default LandingPage;
