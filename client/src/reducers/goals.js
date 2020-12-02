import { GET_USER_GOALS } from "../actions/actionTypes";

const initialState = {
  goals: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_GOALS:
      return {
        ...state,
        goals: payload,
      };
    default:
      return state;
  }
}
