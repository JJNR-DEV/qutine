import { GET_USER_ROUTINES } from "../actions/actionTypes";

const initialState = {
  routines: []
};

export const getUserRoutinesReducer = (state = initialState, action) => {
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

export const createRoutineFbReducer = (state = '', action) => {
  if (action.type === 'CREATE_ROUTINE_FB') {
    return action.payload;
  }

  return state
}
