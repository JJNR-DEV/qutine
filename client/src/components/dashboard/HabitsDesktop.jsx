import React, { useState, useEffect } from 'react';
import TimePole from './TimePole';
import { connect } from 'react-redux';
import { getAllUserRoutines } from '../../actions/routines';
import { deleteRoutine } from '../../api/routines';

const HabitsDesktop = ({ getAllUserRoutines, routines }) => {
  useEffect(() => {
    getAllUserRoutines();
  }, [])
  const [categoryColor, setCategoryColor] = useState([{ home: 'blue' }, { work: 'yellow' }, { training: 'red' }]);

  const createHabit = (object) => {
    const {
      name, startTime, duration, category,
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);

    const eraseBtn = React.createElement(
      'button',
      {
        className: 'erase-btn',
        onClick: async () => {
          await deleteRoutine(name);
          getAllUserRoutines();
        },
        key: Math.random(),
      },
      'X',
    );

    const newModule = React.createElement(
      'div',
      {
        className: `habitModule ${category}`,
        style: {
          height: `${(parseInt(duration) * 56) - 12}px`,
          marginTop: `${(parseInt(startTime) * 56) + 38}px`,
          borderLeft: `${colorMatch[0]} 5px solid`,
          display: 'grid',
          gridTemplateRows: '90% 10%'
        },
        key: Math.random(),
      },
      name,
      eraseBtn
    );
    return newModule;
  };

  const appendHabitToWeek = (divDay) => routines.map( (routine) => {
    return routine.days.map(day => {
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

  return (
    <div className="weekHabitsContainer">
      <TimePole />
      {createWeek()}
    </div>
  );
};

const mapStateToProps = state => {
  return { routines: state.allUserRoutines }
}

export default connect(mapStateToProps, { getAllUserRoutines })(HabitsDesktop);
