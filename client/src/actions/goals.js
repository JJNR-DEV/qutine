import { GET_USER_GOALS } from './actionTypes';
import { allGoals } from '../api/goals';

export const getAllUserGoals = (email) => (dispatch) => {
  allGoals(email).then((data) => {
    dispatch({
      type: GET_USER_GOALS,
      payload: data,
    });
  });
};
