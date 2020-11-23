import React, { useState } from 'react';

const HabitsDesktop = () => {
  const [weekDays, setWeekDays] = useState([
    {day: 'Monday', modules: []},
    {day: 'Tuesday', modules: [
      {
        title: 'This is our first title',
        day: 'Tuesday',
        time: {start: 830, end: 1200},
        repeat: 'everyWeekDay',
        category: 'work',
      },
    ]},
    {day: 'Wednesday', modules: []},
    {day: 'Thursday', modules: [
      {
        title: 'This is our first title',
        day: 'Thursday',
        time: {start: 1030, end: 1200},
        repeat: 'everyWeekDay',
        category: 'training',
      },
    ]},
    {day: 'Friday', modules: []},
    {day: 'Saturday', modules: []},
    {day: 'Sunday', modules: [
      {
        title: 'This is our second title',
        day: 'Sunday',
        time: {start: 830, end: 1200},
        repeat: 'everyWeekDay',
        category: 'work',
      },
    ]}]);
  const [categoryColor, setCategoryColor] = useState([{home: '#CAE4DB'}, {work: '#CAE4DB'}, {training: '#CAE4DB'}]);
  
  const createHabit = (object) => {
    const {title, time, repeat, category} = object;
    const colorMatch = categoryColor.map(color => color[category]).filter(color => color);
    const newModule = React.createElement(
      'div',
      {
        className: `habitModule ${category} ${repeat}`, 
        id: `${time.start}:${time.end}`,
        style: {backgroundColor: colorMatch[0]},
        key: Date.now(),
      },
    title);
    return newModule;
  };
  
  const appendHabitToWeek = (divDay) => {
    return weekDays.map(day => {
      return day.modules.map(module => {
        if(module.day === divDay) {
          return createHabit(module);
        }
        return null;
      })
    })
  };
  
  const createWeek = () => {
    return weekDays.map(day => {
      return React.createElement('div',
      {
        className: `weekday ${day.day}`,
        key: day.day
      },
      [day.day, appendHabitToWeek(day.day)]);
    })
  };
  
  const timePole = () => {
    const timeArr = [];
    for (let i = 0; i < 25; i += 2) {
      timeArr.push(React.createElement('p', {className: 'time', key: i}, i));
    }
    return timeArr;
  };

  return (
    <div className='weekHabitsContainer'>
      <div className='timePole'>
        {timePole()}
      </div>
      {createWeek()}
    </div>
  )
}

export default HabitsDesktop;