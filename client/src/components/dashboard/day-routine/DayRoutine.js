import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllUserDayRoutines } from '../../../actions/routines';
import getWeekDay from '../mobile/helper/getWeekDay';
import './DayRoutine.css';

const DayRoutine = ({ getAllUserDayRoutines, routines }) => {
  const today = getWeekDay();
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    getAllUserDayRoutines(today, email);
  }, []);

  return (
    <div className="day-routine-container">
      <h2>Your Day</h2>
      {routines?.map(habit =>
        <div
          className={`day-routine-task`}
          id={habit.category}>
            {habit.startTime}
            {habit.name}
      </div>)}
    </div>
  )
}

const mapStateToProps = state => ({ routines: state.allUserDayRoutines });

export default connect(mapStateToProps, { getAllUserDayRoutines })(DayRoutine);