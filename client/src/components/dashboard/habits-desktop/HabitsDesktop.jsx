import React, { useRef, useState } from 'react';

import TimePole from '../TimePole';
import { deleteRoutine } from '../../../api/routines';
import Routine from '../../routine/Routine';
import Habit from './Habit';
import { getAllUserRoutines } from "../../../actions/routines";
import { useDispatch, useSelector } from "react-redux";

const HabitsDesktop = () => {
  const dispatch = useDispatch();
  const { routines } = useSelector(state => state.routines);
  const { user } = useSelector(state => state.auth);
  const [displayModal, setDisplayModal] = useState(false);
  const timeRef = useRef(null);
  const categoryArr = ['home', 'work', 'exercise', 'leisure', 'education', 'other'];
  const categoryColor = [{ home: '#7a9d96' }, { work: '#e6b6a9' }, { exercise: '#00303f' }, { leisure: '#ffcf90' }, { education: 'a2b08d' }, { other: '#cae4db' }];
  const [open, setOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

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
        onClick: (e) => {
          e.stopPropagation();
          deleteRoutine(name, day)
            .finally(() => dispatch(getAllUserRoutines(email)));
        },
        key: Math.random(),
      },
      <p>&#10005;</p>,
    );
  };
 
  const makeTimeDecimal = (string) => {
    const split = string.split(/[.:]/);
    const decimal = parseFloat(split[1]) / 60;
    return parseFloat(split[0]) + decimal;
  }

  const createHabit = (object, day, firstHabit) => {
    const {
      name, startTime, duration, category,
    } = object;
    const newModule = React.createElement(
      'div',
      {
        className: 'habitModule',
        id: category,
        style: {
          height: `${(parseFloat(duration) * 57)}px`,
          marginTop: `${(makeTimeDecimal(startTime) * 57) + 86}px`,
          overflow: 'hidden',
        },
        onClick: () => {
          setSelectedRoutine(object);
          {setDisplayModal(val => !val)};
        },
        ref: firstHabit ? timeRef : null,
        key: Math.random(),
      },
      createRemoveButton(name, day),
      createHeader(name),
    );
    return newModule;
  };

  const appendHabitToWeek = divDay => routines?.map((routine) => routine.days.map((day) => {
    if (day === divDay) {
      return createHabit(routine, day);
    }
    return null;
  }));

  const createWeek = () => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekDays.map((day) => <Habit day={day} appendHabitToWeek={appendHabitToWeek} convertToDay={convertToDay} key={day}/>);
  };

  const convertToDay = () => {
    const today = new Date();
    const weekDay = String(today.getDay());
    let day = '';
    switch (weekDay) {
      case '1':
        day = 'Monday';
        break;
      case '2':
        day = 'Tuesday';
        break;
      case '3':
        day = 'Wednesday';
        break;
      case '4':
        day = 'Thursday';
        break;
      case '5':
        day = 'Friday';
        break;
      case '6':
        day = 'Saturday';
        break;
      case '0':
        day = 'Sunday';
        break;
      default:
        break;
    }
    return day;
  };

  const getToday = () => {
    const day = convertToDay();
    return `Happy ${day}!`;
  };

  const createCategoryCircles = () => {
    return categoryArr.map(category => {
      return(
        <div className='categoryBubbleContainer'>
          <div className='categoryBubble' id={category}></div>
          <p>{category}</p>
        </div>
      )
    })
  }

  return (
    <div className="weekHabitsSection">
      <div className='routineTopDiv'>
        <div className='weekdayAndCategoryDescription'>
          <h2 className='todaysDate'>{getToday()}</h2>
          <div className='categoryDescription'>
            {createCategoryCircles()}
          </div>
        </div>
        <button className="createRoutineBtn" onClick={() => {
          setSelectedRoutine(null);
          setDisplayModal(val => !val);
        }}>
          Create Routine
        </button>
      </div>
      <div className="weekHabitsContainer">
        <TimePole/>
        <div className='routineBackground'></div>
        <div className="weekHabits">
          {createWeek()}
        </div>
        {displayModal &&
        <Routine
          show={displayModal}
          selectedRoutine={selectedRoutine}
          handleClose={() => setDisplayModal(false)}/>
        }
      </div>
    </div>
  );
};

export default HabitsDesktop;
