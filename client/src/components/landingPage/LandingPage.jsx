import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import blob from '../../blob.png';
import pic from '../../pic.png';
import signupIcon from '../../signupIcon.png';
import calendarIcon from '../../calendarIcon.png';
import notificationIcon from '../../notificationIcon.png';
import checkedIcon from '../../checkedIcon.png';

const LandingPage = () => {
  const {isLoggedIn, user} = useSelector((state) => state.auth);
  const history = useHistory();

  if (isLoggedIn) {
    history.push('/dashboard');
  }

  return (
    <div className="landingPage">
      <div className="welcomeMessage">
        <h1>Track your day with <span className="qutine">Qutine!</span></h1>
        <p>Routine for your quarantine.</p>
      </div>
      <div className="landingPageButtonsContainer">
        <Link to="/register" className="landingPageButtons registerButton">Register</Link>
        <Link to="/login" className="landingPageButtons logInButton">Log in</Link>
      </div>
      <div className="images">
        <img className='blob' src={blob}/>
        <img className='pic' src={pic}/>
      </div>
      <div className="landingTutorial">
        <div className="signupIcon">
          <img src={signupIcon}/>
          <p>Register to get started with your new routine.</p>
        </div>
        <div className="calendarIcon">
          <img src={calendarIcon}/>
          <p>Create new routines and goals.</p>
        </div>
        <div className="notificationIcon">
          <img src={notificationIcon}/>
          <p>Get notified before it's time to do your routine.</p>
        </div>
        <div className="checkedIcon">
          <img src={checkedIcon}/>
          <p>Track your completed goals.</p>
        </div>
      </div>
    </div>
  );
};


export default LandingPage;
