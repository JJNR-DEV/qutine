import {loginUser, registerUser, logoutUser} from '../api/auth';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
} from './actionTypes';

export const register = (user) => (dispatch) => registerUser(user).then(
  (response) => {
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: {user: response},
    });
    return Promise.resolve();
  },
  (error) => {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: {error: error}
    });
    return Promise.reject();
  });

export const login = (user) => (dispatch) => loginUser(user).then(
  (response) => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {user: response},
    });
    return Promise.resolve();
  },
  (error) => {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: {error: error}
    });
    return Promise.reject();
  });

export const logout = () => (dispatch) => {
  logoutUser();

  dispatch({
    type: USER_LOGOUT,
  });
};
