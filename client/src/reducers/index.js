import { combineReducers } from 'redux';
import auth from './auth';
import { getAllUserRoutinesReducer } from './routines';
import { getAllUserGoalsReducer } from './goals';

export default combineReducers({
  auth,
  allUserRoutines: getAllUserRoutinesReducer,
  allUserGoals: getAllUserGoalsReducer
});
