import './Login.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChangeEmail = (e) => {
    setUser({ ...user, email: e.target.value });
    if (user.email.length < 6) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
  };

  const handleChangePassword = (e) => {
    setUser({ ...user, password: e.target.value });
    if (user.email.length < 6) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(user));
      history.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
    setUser({ email: '', password: '' });
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
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChangeEmail}
          className={`email ${emailValidation ? '' : 'invalid-field'}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChangePassword}
          className={`password ${passwordValidation ? '' : 'invalid-field'}`}
        />
        <button type="submit" className="loginButton">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
