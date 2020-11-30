import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import TimePole from '../TimePole';
import { getAllUserRoutines } from '../../../actions/routines';
import { deleteRoutine } from '../../../api/routines';
import Habit from './habit';

const HabitsDesktop = ({ getAllUserRoutines, routines }) => {
  const timeRef = useRef(null);
  const categoryColor = [{ home: '#a0a0ff' }, { work: '#ffff7d' }, { training: '#ff9898' }];
  
  // const focus = () => {
  //   timeRef.current.scrollIntoView();
  // }

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

  const createHabit = (object, day, firstHabit) => {
    const {
      name, startTime, duration, category,
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const newModule = React.createElement(
      'div',
      {
        className: `habitModule ${category}`,
        style: {
          height: `${(parseInt(duration) * 58 - 4)}px`,
          marginTop: `${(parseInt(startTime) * 58) + 88}px`,
          overflow: 'hidden',
          backgroundColor: colorMatch,
        },
        ref: firstHabit ? timeRef : null,
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
    return weekDays.map((day) => <Habit day={day} appendHabitToWeek={appendHabitToWeek} key={day} />);
  };

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    getAllUserRoutines(email);
    // focus();
  }, []);

  return (
    <div className='weekHabitsContainer'>
      <div className="weekHabits" >
        <TimePole />
        {createWeek()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ routines: state.allUserRoutines });

export default connect(mapStateToProps, { getAllUserRoutines })(HabitsDesktop);
