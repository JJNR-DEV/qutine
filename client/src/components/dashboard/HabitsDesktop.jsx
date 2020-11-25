import React, { useState } from 'react';

const HabitsDesktop = () => {
  const [routines, setRoutines] = useState(
    [
      {
        routineName: 'This is our first title',
        day: ['Tuesday'],
        startTime: '10',
        duration: '2',
        category: 'work',
      },
      {
        routineName: 'This is our second title',
        day: ['Monday', 'Tuesday', 'Friday'],
        startTime: '12',
        duration: '5',
        category: 'home',
      },
      {
        routineName: 'This is our Third title',
        day: ['Monday'],
        startTime: '8',
        duration: '3.5',
        category: 'home',
      },
    ],
  );

  const [categoryColor, setCategoryColor] = useState([{ home: 'blue' }, { work: 'yellow' }, { training: 'red' }]);

  const createHabit = (object) => {
    const {
      routineName, startTime, duration, category,
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const newModule = React.createElement(
      'div',
      {
        className: `habitModule ${category}`,
        style: {
          height: `${(duration * 56) - 12}px`,
          marginTop: `${(startTime * 56) + 38}px`,
          borderLeft: `${colorMatch[0]} 5px solid`,
        },
        key: Date.now(),
      },
      routineName,
    );
    return newModule;
  };

  const appendHabitToWeek = (divDay) => routines.map( (routine) => {
    return routine.day.map(day => {
      if (day === divDay) {
        return createHabit(routine);
      }
      return null;
    })
  });

  const createWeek = () => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekDays.map((day) => React.createElement('div',
      {
        className: `weekday ${day}`,
        key: day,
      },
      [day, appendHabitToWeek(day)]));
  };

  const addZero = (index) => {
    let newNum;
    if (index.toString().length < 2) {
      newNum = `0${index}`;
    } else {
      newNum = `${index}`;
    }
    return newNum;
  };

  const timePole = () => {
    const timeArr = [];
    for (let i = 0; i < 25; i++) {
      timeArr.push(React.createElement('p', { className: 'time', key: i }, `${addZero(i)}.00`));
    }
    return timeArr;
  };

  return (
    <div className="weekHabitsContainer">
      <div className="timePole">
        {timePole()}
      </div>
      {createWeek()}
    </div>
  );
};

export default HabitsDesktop;
