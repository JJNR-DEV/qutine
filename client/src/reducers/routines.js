export const getAllUserRoutinesReducer = (state = [], action) => {
  const { type, payload } = action;
  if (type === 'GET_USER_ROUTINES') {
    return payload;
  }
  
  return state;
};

export const getAllUserDayRoutinesReducer = (state = [], action) => {
  const { type, payload } = action;
  if (type === 'GET_USER_DAY_ROUTINES') {
    return payload;
  }
  
  return state;
};
