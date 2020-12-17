import React, { useEffect, useState } from 'react';

const Habit = (props) => {
  const [weekdayStyle, setWeekDayStyle] = useState({});

  const setTodayBorder = (weekday) => {
    const today = props.convertToDay();
    console.log(today, weekday)
    if (weekday === today) {
      setWeekDayStyle({
        backgroundColor: '#00303F',
        color: 'white'
    });
  }
}

useEffect(() => {
  setTodayBorder(props.day);
}, [])

  return (
    <div className='weekday' id={props.day} key={props.day}>
      <div className='weekdayName' key={`${props.day}2`} style={weekdayStyle}>
        {props.day}
      </div>
      {props.appendHabitToWeek(props.day)}
    </div>
  );
};

export default Habit;
