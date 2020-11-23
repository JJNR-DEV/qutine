import React, {useState} from 'react';
import {registerUser} from '../../api/auth';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChangeName = (e) => {
    setUser({...user, name: e.target.value});
  };

  const handleChangeEmail = (e) => {
    setUser({...user, email: e.target.value});
  };

  const handleChangePassword = (e) => {
    setUser({...user, password: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(user)
      .then(res => console.log(res));

    setUser({name: '', email: '', password: ''});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type='text' value={user.name} onChange={handleChangeName}/>
        </label>
        <label>
          Email
          <input type='email' value={user.email} onChange={handleChangeEmail}/>
        </label>
        <label>
          Password
          <input type='password' value={user.password} onChange={handleChangePassword}/>
        </label>
        <button type='submit'>Register!</button>
      </form>
    </div>
  );
};

export default Register;
