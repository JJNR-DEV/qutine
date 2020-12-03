import {loginUser, logoutUser, registerUser} from '../api/auth';
import {HIDE_SNACKBAR, SHOW_SNACKBAR, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,} from './actionTypes';

export const register = (user) => (dispatch) => registerUser(user).then(
    (response) => {
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: {
                name: response.name,
                id: response.id,
                _id: response.id,
                email: response.email,
                accessToken: response.accessToken
            },
        });
        return Promise.resolve();
    },
    (error) => {
        dispatch({
            type: USER_REGISTER_FAIL,
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

        return Promise.reject();
    },
);

export const login = (user) => (dispatch) => loginUser(user).then(
    (response) => {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
                name: response.name,
                id: response.id,
                _id: response.id,
                email: response.email,
                accessToken: response.accessToken
            },
        });
        return Promise.resolve();
    },
    (error) => {
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

        return Promise.reject();
    },
);

export const logout = () => (dispatch) => {
    logoutUser();

    dispatch({
        type: USER_LOGOUT,
    });
};
