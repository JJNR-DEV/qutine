import React, { useState } from 'react';
import './Register.css';
import { registerUser } from '../../api/auth';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChangeName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handleChangePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(user)
      .then((res) => console.log(res));

    setUser({ name: '', email: '', password: '' });
  };

  return (
    <div className="register">
      <h1 className="registerGreetingMessage">Register now and start your routine today!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={user.name} onChange={handleChangeName} placeholder="Name" />
        <input type="email" value={user.email} onChange={handleChangeEmail} placeholder="Email" />
        <input type="password" value={user.password} onChange={handleChangePassword} placeholder="Password" />
        <button type="submit">Register!</button>
      </form>
    </div>
  );
};

export default Register;
