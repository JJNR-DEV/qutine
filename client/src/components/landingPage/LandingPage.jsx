import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const history = useHistory();

    if (isLoggedIn) {
        history.push('/dashboard');
    }

    return (
        <div className="landingPage">
            <img className="logo" src={require('../../logo-removebg-preview copy.png').default} alt="logo"/>
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
};


export default LandingPage;
