import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import blob from '../../blob.png';
import pic from '../../pic.png';

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
      <div></div>
    </div>
  );
};


export default LandingPage;
