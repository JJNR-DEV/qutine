import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import TimePole from '../TimePole';
import { getAllUserRoutines } from '../../../actions/routines';
import { deleteRoutine } from '../../../api/routines';
import Routine from '../../routine/Routine';
import Habit from './Habit';
import Modal from "../../modal/Modal";
import RoutineDetails from "../../routine/RoutineDetails";

const HabitsDesktop = ({ getAllUserRoutines, routines }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const timeRef = useRef(null);
  const categoryColor = [{ home: '#7a9d96' }, { work: '#e6b6a9' }, { exercise: '#00303f' }, {leisure: '#ffcf90'}, {education: 'a2b08d'}, {other: '#cae4db'}];
  const [open, setOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    getAllUserRoutines(email);
  }, []);

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
        onClick:  () => {
           deleteRoutine(name, day)
             .finally(() => getAllUserRoutines(email));
          // await getAllUserRoutines(email);
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
          height: `${(parseInt(duration) * 57) -5}px`,
          marginTop: `${(parseInt(startTime) * 57) + 90}px`,
          overflow: 'hidden',
          backgroundColor: colorMatch,
        },
        // onClick: () => {
        //   setSelectedRoutine(object);
        //   setOpen(val => !val);
        // },
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
    return weekDays.map((day) => <Habit day={day} appendHabitToWeek={appendHabitToWeek} key={day}/>);
  };

  const convertToDay = () => {
    const today = new Date();
    const weekDay = String(today.getDay());
      let day = '';
      switch(weekDay) {
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
          day = 'THursday';
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

  const dateName = (num) => {
    const parsedNum = parseInt(num);
    let date;
    if (parsedNum === 1) {
      date = `${num}st`;
    } else if (parsedNum === 2) {
      date = `${num}nd`;
    } else if (parsedNum === 3) {
      date = `${num}rd`;
    } else {
      date = `${num}th`;
    };
    return date;
  };

  const getToday = () => {
    const today = new Date();
    const date = String(today.getDate());
    const day = convertToDay();
    return `${day} ${dateName(date)}`;
  };

  return (
    <div className="weekHabitsSection">
      {selectedRoutine && <Modal open={open} toggle={setOpen}>
        <RoutineDetails routine={selectedRoutine}/>
      </Modal>}
      <div className='routineTopDiv'>
        <h2 className='todaysDate'>{getToday()}</h2>
        <button className="createRoutineBtn" onClick={() => setDisplayModal(!displayModal)}>Create Routine</button>
      </div>
      <div className="weekHabitsContainer">
        <TimePole />
        <div className='routineBackground'></div>
        <div className="weekHabits" >
          {createWeek()}
        </div>
        <Routine show={displayModal} handleClose={() => setDisplayModal(false)}/>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ routines: state.allUserRoutines });

export default connect(mapStateToProps, { getAllUserRoutines })(HabitsDesktop);
