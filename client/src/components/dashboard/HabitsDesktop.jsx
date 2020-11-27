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

  const createHeader = (name) => {
    return React.createElement(
      'h3',
      {
        className: 'routineName',
      },
      name
    );
  }

  const createRemoveButton = (name, day) => {
    return React.createElement(
      'button',
      {
        className: 'eraseBtn',
        onClick: async () => {
          await deleteRoutine(name, day);
          getAllUserRoutines();
        },
        key: Math.random(),
      },
      <p>&#10005;</p>
    );
  }

  const createCategoryDiv = (color) => {
    return React.createElement(
      'div',
      {
        className: 'categoryBackground',
        style: {
          background: `radial-gradient(circle, ${color} 20%, transparent 0%)`,
          backgroundSize: '20px 2px',
          transform: 'rotate(45deg)',
          opacity: '0.1',
          height: '300%',
          width: '50%',
          position: 'absolute',
          zIndex: '0',
        },
        key: Math.random(),
      },
    );
  }

  const createHabit = (object, day) => {
    const { name, startTime, duration, category } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const newModule = React.createElement(
      'div',
      {
        className: `habitModule ${category}`,
        style: {
          height: `${(parseInt(duration) * 56 - 3)}px`,
          marginTop: `${(parseInt(startTime) * 56) + 39}px`,
          overflow: 'hidden',
          zIndex: '10',
        },
        key: Math.random(),
      },
      createCategoryDiv(colorMatch[0]),
      createHeader(name),
      createRemoveButton(name, day)
    );
    return newModule;
  };

  const appendHabitToWeek = (divDay) => routines.map( (routine) => {
    return routine.days.map(day => {
      if (day === divDay) {
        return createHabit(routine, day);
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
