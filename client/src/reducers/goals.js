export const getAllUserGoalsReducer =  (state = [], action) => {
  const { type, payload } = action;

  switch(type){
      case 'GET_USER_GOALS':
          return [...state, ...payload];
      default:
          return state;
  }
}