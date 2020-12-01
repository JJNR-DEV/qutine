export const getAllUserGoalsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_USER_GOALS':
      return payload;
    default:
      return state;
  }
};

export const createNewGoalReducer = (state = '', action) => {
  const { type, payload } = action;

  switch (type) {
    case 'NEW_GOAL':
      return payload;
    default:
      return state;
  }
}