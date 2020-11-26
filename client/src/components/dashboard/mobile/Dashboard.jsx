import React, { useState, useEffect } from 'react';
import './DashboardMobile.css';
import TimePole from '../TimePole';
import getWeekDay from './helper/getWeekDay';
import { connect } from 'react-redux';
import { getAllUserDayRoutines } from '../../../actions/routines';
import { deleteRoutine } from '../../../api/routines';

const Dashboard = ({ getAllUserDayRoutines, routines }) => {
  const today = getWeekDay();

  useEffect(() => {
    getAllUserDayRoutines(today);
  }, [])

  const [categoryColor, setCategoryColor] = useState([{ home: 'blue' }, { work: 'yellow' }, { training: 'red' }]);

  const createHabit = (object) => {
    const { name, startTime, duration, category } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const eraseBtn = React.createElement(
      'button',
      {
        className: 'erase-btn',
        onClick: async () => {
          await deleteRoutine(name, today);
          getAllUserDayRoutines(today);
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

  const appendHabitToDay = () => routines.map(routine => {
    return createHabit(routine);
  });

  const createDay = () => {
    return React.createElement('div',
      {
        className: `weekday ${today}`,
        key: Math.random(),
      },
      [today, appendHabitToDay(today)]);
  };

  return (
    <div className="dayHabitsContainer">
      <TimePole />
      {createDay()}
    </div>
  );
}

const mapStateToProps = state => {
  return { routines: state.allUserRoutines }
}

export default connect(mapStateToProps, { getAllUserDayRoutines })(Dashboard)