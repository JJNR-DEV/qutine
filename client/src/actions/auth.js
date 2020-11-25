import {loginUser, registerUser} from '../api/auth';
import {USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS} from './actionTypes';

export const login = (user) => (dispatch) => loginUser(user)
  .then(response => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user: response },
    });
    return Promise.resolve();
  },
  (error) => {
    dispatch({
      type: USER_LOGIN_FAIL,
    });
    return Promise.reject();
  },
);

export const register = (user) => (dispatch) => registerUser(user)
  .then(response => {
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: { user: response },
    });
    return Promise.resolve();
  },
    (error) => {
    dispatch({
      type: USER_REGISTER_FAIL,
    });
    return Promise.reject();
    },
);
