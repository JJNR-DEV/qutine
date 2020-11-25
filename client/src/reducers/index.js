import { combineReducers } from 'redux';
import auth from './auth';
import { getAllUserRoutinesReducer } from './routines';

export default combineReducers({
  auth,
  allUserRoutines: getAllUserRoutinesReducer
});
