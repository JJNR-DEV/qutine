import { HIDE_SNACKBAR, SHOW_SNACKBAR } from '../actions/actionTypes';

const initialState = {
  success: false,
  message: '',
  show: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HIDE_SNACKBAR:
      return {
        ...state,
        success: false,
        message: '',
        show: false,
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        success: payload.success,
        message: payload.message,
        show: true,
      };
    default:
      return state;
  }
}
