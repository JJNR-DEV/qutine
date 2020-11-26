import { GET_USER_ROUTINES, GET_USER_DAY_ROUTINES } from './actionTypes';
import { allRoutines, allDayRoutines } from '../api/routines';

export const getAllUserRoutines = () => dispatch => {
    allRoutines().then(data => {
        dispatch({
            type: GET_USER_ROUTINES,
            payload: data
        })
    })
}

export const getAllUserDayRoutines = today => dispatch => {
    allDayRoutines(today).then(data => {
        dispatch({
            type: GET_USER_DAY_ROUTINES,
            payload: data
        })
    })
}