import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import TimePole from '../TimePole';
import { getAllUserRoutines } from '../../../actions/routines';
import { deleteRoutine } from '../../../api/routines';
import Routine from '../../routine/Routine';
import Habit from './Habit';
import Modal from "../../modal/Modal";

const HabitsDesktop = ({ getAllUserRoutines, routines }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const timeRef = useRef(null);
  const categoryColor = [{ home: '#a0a0ff' }, { work: '#ffff7d' }, { training: '#ff9898' }];
  const categoryColorMap = [{ type: 'home', color: '#a0a0ff' }, {type:'work', color: '#ffff7d' }, { type: 'training', color: '#ff9898' }];
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
        onClick: async () => {
          await deleteRoutine(name, day);
          getAllUserRoutines(email);
        },
        key: Math.random(),
      },
      <p>&#10005;</p>,
    );
  };

  const findCategoryColor = (category) => {
    return categoryColorMap.filter(val =>  val.type === category).map(val => val.color);
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
          height: `${(parseInt(duration) * 58 - 6)}px`,
          marginTop: `${(parseInt(startTime) * 58) + 94}px`,
          overflow: 'hidden',
          backgroundColor: colorMatch,
        },
        onClick: () => {
          setSelectedRoutine(object);
          setOpen(val => !val);
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
    return weekDays.map((day) => <Habit day={day} appendHabitToWeek={appendHabitToWeek} key={day}/>);
  };


  return (
    <div className="weekHabitsSection">
      {/*<button id="open-button"  onClick={() => setOpen(true)}>Open Button</button>*/}
      {selectedRoutine && <Modal open={open} toggle={setOpen}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ verticalAlign: 'middle' }}>{selectedRoutine.name}
            <span className="md-chip"
                  style={{ background: findCategoryColor(selectedRoutine.category) }}>{selectedRoutine.category}</span>
          </h1>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam,
            doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius
            assumenda, cumque.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam,
            doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius
            assumenda, cumque.</p>
        </div>
      </Modal>}
      <button className="createRoutineBtn" onClick={() => setDisplayModal(!displayModal)}>Create Routine</button>
      <div className="weekHabitsContainer">
        <TimePole />
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
