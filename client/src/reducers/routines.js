import { GET_USER_ROUTINES } from "../actions/actionTypes";

const initialState = {
  routines: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_ROUTINES:
      return {
        ...state,
        routines: payload,
      };
    default:
      return state;
  }
}
