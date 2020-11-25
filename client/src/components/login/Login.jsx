import './Login.css';
import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const validateInput = (user) => {
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');

    if (user.email === '') {
      return email.classList.add('invalid-field');
    }
    email.classList.remove('invalid-field');

    if (user.password === '') {
      return password.classList.add('invalid-field');
    }
    password.classList.remove('invalid-field');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: document.querySelector('.email').value,
      password: document.querySelector('.password').value,
    };

    validateInput(user);

    try {
      await dispatch(login(user));
      return history.push('/dashboard');
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
        <input className="email" type="email" placeholder="Email" />
        <input className="password" type="password" placeholder="Password" />
        <button to="/dashboard" className="loginButton">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
