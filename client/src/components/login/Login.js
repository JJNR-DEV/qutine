import './login.css';
import React, {useState} from 'react';
import {loginUser} from "../../api/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChangeEmail = (e) => {
    setUser({...user, email: e.target.value});
  };

  const handleChangePassword = (e) => {
    setUser({...user, password: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(user)
      .then(res => console.log(res));

    setUser({email: '', password: ''});
  };

  return (
    <div className="login">
      <h1 className='loginGreetingMessage'>Log in <span className='loginGreetingMessageSpan1'><br />and get started with your routine!</span></h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='email' value={user.email} onChange={handleChangeEmail} placeholder='Email' />
        </label>
        <label>
          <input type='password' value={user.password} onChange={handleChangePassword} placeholder='Password' />
        </label>
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
