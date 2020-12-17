import {USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS} from "../actions/actionTypes";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? {
        isLoggedIn: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken
        },
    }
    : {
        isLoggedIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            accessToken: null
        }
    };

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            };
        case USER_REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case USER_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
