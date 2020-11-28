import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TimePole from './TimePole';
import { getAllUserRoutines } from '../../actions/routines';
import { deleteRoutine } from '../../api/routines';

const HabitsDesktop = ({ getAllUserRoutines, routines }) => {
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    getAllUserRoutines(email);
  }, []);
  const [categoryColor, setCategoryColor] = useState([{ home: '#a0a0ff' }, { work: '#ffff7d' }, { training: '#ff9898' }]);

  const createHeader = (name) => React.createElement(
    'h3',
    {
      className: 'routineName',
    },
    name,
  );

  const createRemoveButton = (name, day) => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return React.createElement(
      'button',
      {
        className: 'eraseBtn',
        onClick: async () => {
          await deleteRoutine(name, day);
          getAllUserRoutines(email);
        },
        key: Math.random(),
      },
      <p>&#10005;</p>,
    );
  };

  const createHabit = (object, day) => {
    const {
      name, startTime, duration, category,
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const newModule = React.createElement(
      'div',
      {
        className: `habitModule ${category}`,
        style: {
          height: `${(parseInt(duration) * 56 - 3)}px`,
          marginTop: `${(parseInt(startTime) * 56) + 39}px`,
          overflow: 'hidden',
          backgroundColor: colorMatch,
        },
        key: Math.random(),
      },
      createRemoveButton(name, day),
      createHeader(name),
    );
    return newModule;
  };

  const appendHabitToWeek = (divDay) => routines.map((routine) => routine.days.map((day) => {
    if (day === divDay) {
      return createHabit(routine, day);
    }
    return null;
  }));

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

const mapStateToProps = (state) => ({ routines: state.allUserRoutines });

export default connect(mapStateToProps, { getAllUserRoutines })(HabitsDesktop);
