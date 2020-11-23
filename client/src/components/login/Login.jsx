import './login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../api/auth';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChangeEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handleChangePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(user)
      .then((res) => console.log(res));

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
          <input type="email" value={user.email} onChange={handleChangeEmail} placeholder="Email" />
          <input type="password" value={user.password} onChange={handleChangePassword} placeholder="Password" />
        <Link to="/dashboard" className="loginButton">Sign in</Link>
      </form>
    </div>
  );
};

export default Login;
