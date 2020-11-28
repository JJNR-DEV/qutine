import { GET_USER_ROUTINES, GET_USER_DAY_ROUTINES } from './actionTypes';
import { allRoutines, allDayRoutines } from '../api/routines';

export const getAllUserRoutines = email => dispatch => {
    allRoutines(email).then(data => {
        dispatch({
            type: GET_USER_ROUTINES,
            payload: data
        })
    })
}

export const getAllUserDayRoutines = (today, email) => dispatch => {
    allDayRoutines(today, email).then(data => {
        dispatch({
            type: GET_USER_DAY_ROUTINES,
            payload: data
        })
    })
}