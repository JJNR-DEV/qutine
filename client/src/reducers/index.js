import { combineReducers } from 'redux';
import auth from './auth';
import { getAllUserRoutinesReducer, getAllUserDayRoutinesReducer } from './routines';
import { getAllUserGoalsReducer } from './goals';
import snackbar from './snackbar';

export default combineReducers({
  auth,
  snackbar,
  allUserRoutines: getAllUserRoutinesReducer,
  allUserDayRoutines: getAllUserDayRoutinesReducer,
  allUserGoals: getAllUserGoalsReducer,
});
