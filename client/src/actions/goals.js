import { GET_USER_GOALS, NEW_GOAL, HIDE_SNACKBAR, SHOW_SNACKBAR } from './actionTypes';
import { allGoals, createGoal } from '../api/goals';

export const getAllUserGoals = email => dispatch => {
  allGoals(email).then(data => {
    dispatch({
      type: GET_USER_GOALS,
      payload: data,
    });
  });
};

export const createNewGoal = goal => dispatch => {
  createGoal(goal).then(data => {
    console.log(data);
    dispatch({
      type: NEW_GOAL,
      payload: data,
    })
  })
}