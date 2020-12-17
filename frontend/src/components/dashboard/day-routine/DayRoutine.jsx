import React, { useEffect } from 'react';

import { getAllUserDayRoutines } from '../../../actions/routines';
import weekdayUtils from '../mobile/helper/weekday-utils';
import './DayRoutine.css';
import { useDispatch, useSelector } from "react-redux";

const DayRoutine = () => {
  const today = weekdayUtils();
  const dispatch = useDispatch();
  const { routines } = useSelector(state => state.routines)

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    dispatch(getAllUserDayRoutines(today, email));
  }, []);

  return (
    <div className="day-routine-container">
      <h2>Your Day</h2>
      {routines?.map(habit =>
        <div
        key={Math.random()}
          className={`day-routine-task`}
          id={habit.category}>
            {habit.startTime}
            {habit.name}
      </div>)}
    </div>
  );
};

export default DayRoutine;
