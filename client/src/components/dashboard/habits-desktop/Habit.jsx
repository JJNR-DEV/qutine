import React, { useEffect, useState } from 'react';

const Habit = (props) => {
  const [weekdayStyle, setWeekDayStyle] = useState({});

  const setTodayBorder = (weekday) => {
    const today = props.convertToDay();
    console.log(today, weekday)
    if (weekday === today) {
      setWeekDayStyle({
        borderLeft: '2px solid #DCAE1D',
        borderRight: '2px solid #DCAE1D',
        borderTop: '2px solid #DCAE1D',
        marginTop: '-14px',
    });
  }
}

useEffect(() => {
  setTodayBorder(props.day);
}, [])

  return (
    <div className='weekday' id={props.day} key={props.day} style={weekdayStyle}>
      <div className='weekdayName' key={`${props.day}2`} style={weekdayStyle}>
        {props.day}
      </div>
      {props.appendHabitToWeek(props.day)}
    </div>
  );
};

export default Habit;
