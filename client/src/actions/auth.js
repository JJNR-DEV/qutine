import { loginUser } from '../api/auth';
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from './actionTypes';

export const login = (user) => (dispatch) => loginUser(user).then(
  (response) => {
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
