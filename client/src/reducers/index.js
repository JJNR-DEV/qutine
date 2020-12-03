import { combineReducers } from 'redux';
import auth from './auth';
import goals from './goals';
import snackbar from './snackbar';
import { getUserRoutinesReducer, createRoutineFbReducer } from "./routines";

export default combineReducers({
  auth,
  snackbar,
  routines: getUserRoutinesReducer,
  newRoutineFb: createRoutineFbReducer,
  goals,
});
