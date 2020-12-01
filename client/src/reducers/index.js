import { combineReducers } from 'redux';
import auth from './auth';
import { getAllUserRoutinesReducer } from './routines';
import { getAllUserGoalsReducer, createNewGoalReducer } from './goals';
import snackbar from './snackbar';

export default combineReducers({
  auth,
  snackbar,
  allUserRoutines: getAllUserRoutinesReducer,
  allUserGoals: getAllUserGoalsReducer,
  newGoalMessage: createNewGoalReducer
});
