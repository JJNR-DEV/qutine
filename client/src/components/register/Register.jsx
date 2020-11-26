import React, { useState } from 'react';
import './Register.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [nameValidation, setNameValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChangeName = (e) => {
    setUser({ ...user, name: e.target.value });
    if (user.name.length < 3) {
      setNameValidation(false);
    } else {
      setNameValidation(true);
    }
  };

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
    if (user.password.length < 6) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(register(user));
      return history.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
    setUser({ name: '', email: '', password: '' });
  };

  return (
    <div className="register">
      <h1 className="registerGreetingMessage">Register now and start your routine today!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.name}
          onChange={handleChangeName}
          placeholder="Name"
          className={(nameValidation ? '' : 'invalid-field')}
        />
        <input
          type="email"
          value={user.email}
          onChange={handleChangeEmail}
          placeholder="Email"
          className={(emailValidation ? '' : 'invalid-field')}
        />
        <input type="password" value={user.password} onChange={handleChangePassword} placeholder="Password" className={(passwordValidation ? '' : 'invalid-field')} />
        <button type="submit">Register!</button>
      </form>
    </div>
  );
};

export default Register;
