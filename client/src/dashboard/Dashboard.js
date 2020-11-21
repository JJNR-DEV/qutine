import React, { useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [weekDays, setWeekDays] = useState([
    {day: 'Monday', modules: []},
    {day: 'Tuesday', modules: [
      {
        title: 'This is our first title',
        day: 'Tuesday',
        time: {start: 830, end: 1200},
        repeat: 'everyWeekDay',
        category: 'home',
      },
    ]},
    {day: 'Wednesday', modules: []},
    {day: 'Thursday', modules: []},
    {day: 'Friday', modules: []},
    {day: 'Saturday', modules: []},
    {day: 'Sunday', modules: [
      {
        title: 'This is our second title',
        day: 'Sunday',
        time: {start: 830, end: 1200},
        repeat: 'everyWeekDay',
        category: 'home',
      },
    ]}]);

  const createHabit = (object) => {
    const {title, time, repeat, category} = object;
    const newModule = React.createElement(
      'div',
      {
        className: `habitModule category-${category} repeat-${repeat}`, 
        id: `${time.start}:${time.end}`,
        key: Date.now(),
      },
    title);
    return newModule;
  }

  const appendHabitToWeek = (divDay) => {
    return weekDays.map(day => {
      return day.modules.map(module => {
        console.log(module.day, divDay)
        if(module.day === divDay) {
          return createHabit(module);
        }
        return null;
      })
    })
  }

  const createWeek = () => {
    return weekDays.map(day => {
      return React.createElement('div',
      {
        className: `weekday ${day.day}`,
        key: day.day
      },
      [day.day, appendHabitToWeek(day.day)]);
    })
  }

  return (
    <div>
      <div className='weekHabitsContainer'>
        {createWeek()}
      </div>
      <div className='weekGoalsContainer'>
      </div>
    </div>
  )
}

export default Dashboard;