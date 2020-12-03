import { GET_USER_ROUTINES, GET_USER_DAY_ROUTINES, CREATE_ROUTINE_FB, HIDE_SNACKBAR, SHOW_SNACKBAR } from './actionTypes';
import { allRoutines, allDayRoutines, createRoutine } from '../api/routines';

export const getAllUserRoutines = (email) => (dispatch) => {
  allRoutines(email).then((data) => {
    dispatch({
      type: GET_USER_ROUTINES,
      payload: data,
    });
  });
};

export const getAllUserDayRoutines = (today, email) => dispatch => {
  allDayRoutines(today, email).then((data) => {
    dispatch({
      type: GET_USER_DAY_ROUTINES,
      payload: data,
    });
  });
};

export const createRoutineAction = routine => dispatch => {
  createRoutine(routine).then((data) => {
    dispatch({
      type: CREATE_ROUTINE_FB,
      payload: data,
    });
  });
};
