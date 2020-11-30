import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TimePole from '../TimePole';
import { getAllUserRoutines } from '../../../actions/routines';
import { deleteRoutine } from '../../../api/routines';

const Habit = (props) => {

  return (
    <div className='weekday' id={props.day} key={`${props.day}`}>
      <div className='weekdayName' key={`${props.day}2`}>
        {props.day}
      </div>
      {props.appendHabitToWeek(props.day)}
    </div>
  );
};

export default Habit;
