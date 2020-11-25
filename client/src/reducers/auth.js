const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'USER_REGISTER_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'USER_REGISTER_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case 'USER_LOGIN_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
