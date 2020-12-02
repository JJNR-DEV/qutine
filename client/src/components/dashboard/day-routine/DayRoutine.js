import React, { useEffect } from 'react';

import { getAllUserDayRoutines } from '../../../actions/routines';
import getWeekDay from '../mobile/helper/getWeekDay';
import './DayRoutine.css';
import { useDispatch, useSelector } from "react-redux";

const DayRoutine = () => {
  const today = getWeekDay();
  const dispatch = useDispatch();
  const { routines } = useSelector(state => state.routines)

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    dispatch(getAllUserDayRoutines(today, email));
  }, []);

  return (
    <div className="day-routine-container">
      <h2>Your Day</h2>
      {routines?.map(habit => <div className="day-routine-task">{habit.startTime} {habit.name}</div>)}
    </div>
  );
};

export default DayRoutine;
