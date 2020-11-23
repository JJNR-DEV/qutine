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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type='email' value={user.email} onChange={handleChangeEmail}/>
        </label>
        <label>
          Password
          <input type='password' value={user.password} onChange={handleChangePassword}/>
        </label>
        <button>Sign in!</button>
      </form>
    </div>
  );
};

export default Login;
