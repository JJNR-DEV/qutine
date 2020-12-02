import React, { useEffect, useState } from 'react';
import './DashboardMobile.css';
import TimePole from '../TimePole';
import getWeekDay from './helper/getWeekDay';
import { deleteRoutine } from '../../../api/routines';
import { getAllUserDayRoutines } from "../../../actions/routines";
import { useDispatch, useSelector } from "react-redux";

const DashboardMobile = ( ) => {
  const today = getWeekDay();
  const dispatch = useDispatch();
  const {routines} = useSelector(state => routines);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    dispatch(getAllUserDayRoutines(today, email));
  }, []);

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
          await deleteRoutine(name, today);
          await dispatch(getAllUserDayRoutines(today));
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
          gridTemplateRows: '90% 10%',
        },
        key: Math.random(),
      },
      name,
      eraseBtn,
    );
    return newModule;
  };

  const appendHabitToDay = () => routines.map((routine) => createHabit(routine));

  const createDay = () => React.createElement('div',
    {
      className: `weekday ${today}`,
      key: Math.random(),
    },
    [today, appendHabitToDay(today)]);

  return (
    <div className="dayHabitsContainer">
      <TimePole />
      {createDay()}
    </div>
  );
};

export default DashboardMobile;
