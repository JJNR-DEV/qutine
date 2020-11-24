import './Login.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../actions';

import { connect } from 'react-redux'

const Login = props => {
  const validateInput = user => {
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');

    if (user.email === '') {
      return email.classList.add('invalid-field');
    } else {
      email.classList.remove('invalid-field');
    }

    if (user.password === '') {
      return password.classList.add('invalid-field');
    } else {
      password.classList.remove('invalid-field');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: document.querySelector('.email').value,
      password: document.querySelector('.password').value
    };

    console.log(user)

    validateInput(user);

    try {
      await props.loginUser(user);
      return (<Redirect to={'/login'} />)
    } catch (error) {
      console.error(error);
    }

    document.querySelector('.email').value = '';
    document.querySelector('.password').value = '';
  };

  return (
    <div className="login">
      <h1 className="loginGreetingMessage">
        Log in
        <span className="loginGreetingMessageSpan1">
          <br />
          and get started with your routine!
        </span>
      </h1>
      <form onSubmit={handleSubmit}>
        <input className='email' type="email" placeholder="Email" />
        <input className='password' type="password"
          placeholder="Password" />
        <button to="/dashboard" className="loginButton">Sign in</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { login: state.login }
}

export default connect(mapStateToProps, { loginUser })(Login);
