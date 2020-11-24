import { combineReducers } from 'redux';

const loginUserReducer = (state = '', action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            localStorage.setItem("user", JSON.stringify(action.payload));
            state = action.payload;
            break;
        case 'USER_LOGOUT':
            localStorage.removeItem("user");
            state = '';
            break;
        default: state;
    }
    return state;
}

export default combineReducers({
    login: loginUserReducer
})