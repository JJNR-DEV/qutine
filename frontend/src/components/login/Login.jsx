import './Login.css';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/auth';
import {HIDE_SNACKBAR, SHOW_SNACKBAR, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from "../../actions/actionTypes";
import {loginUser} from "../../api/auth";

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
    setUser({...user, email: e.target.value});
    if (user.email.length < 6) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
  };

  const handleChangePassword = (e) => {
    setUser({...user, password: e.target.value});
    if (user.email.length < 6) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(user)
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            name: data.name,
            id: data.id,
            _id: data.id,
            email: data.email,
            accessToken: data.accessToken
          },
        });
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {error},
        });

        dispatch({
          type: SHOW_SNACKBAR,
          payload: {
            success: false,
            message: error.response.data,
          },
        });

        setTimeout(() => {
          dispatch({
            type: HIDE_SNACKBAR,
          });
        }, 2900);
      });

    setUser({email: '', password: ''});
  };

  return (
    <div className="login">
      <h1 className="loginGreetingMessage">
        Login and get started with your routine!
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
        <button type="submit" className="loginButton">Login</button>
      </form>
    </div>
  );
};

export default Login;
