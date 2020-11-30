import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Routine.css';
import { createRoutine } from '../../api/routines';
import { formValidation } from './RoutineValidation';
import { getAllUserRoutines } from '../../actions/routines';

const Routine = ({ handleClose, show, getAllUserRoutines }) => {
  const showHideClassName = show ? "addRoutine modal display-block" : "addRoutine modal display-none";
  const buttonStyle = {
    position: 'relative',
    top: '-10px',
    backgroundColor: '#fff',
    borderRadius: '1em',
    right: '-45%',
    fontWeight: 'bold',
    padding: '2px 4px'
  }

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sTime, setSTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleSTime = e => setSTime(e.target.value); 
  const handleDuration = e => setDuration(e.target.value); 

  // const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const weekDays = [...document.querySelectorAll('.selectionDays li input')];
    const selectedDays = weekDays.filter((day) => day.checked);

    const valid = formValidation(e.target, { name, sTime, duration, category }, selectedDays);
    if (valid) return;

    const { email } = JSON.parse(localStorage.getItem('user'));

    const routine = {
      name,
      category,
      sTime,
      duration,
      days: selectedDays.map((day) => day.value),
      userEmail: email,
    };

    try {
      const { email } = JSON.parse(localStorage.getItem('user'));
      await createRoutine(routine);
      getAllUserRoutines(email);
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={showHideClassName}>
      <form onSubmit={handleSubmit}>
        <button onClick={handleClose} style={buttonStyle} type="button">&#10005;</button>
        <h1 className="addRoutineMessage">Enter a routine for your week</h1>
        <div className="newRoutineDetails">
          <input id="routineName" type="text" placeholder="Name" onChange={handleNameChange} />
          <input id="routineStime" type="time" placeholder="Start Time" onChange={handleSTime} />
          <input id="routineDuration" type="time" placeholder="Duration" onChange={handleDuration} />
          <select id="routineCategory" onChange={handleCategoryChange}>
            <option>Choose Category</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="training">Training</option>
          </select>
        </div>        
        <div className="selectionDays">
          <span>Choose Days: </span>
          <ul>
            <li>
              <input type="checkbox" value="Monday" />
              {' '}
              M
            </li>
            <li>
              <input type="checkbox" value="Tuesday" />
              {' '}
              T
            </li>
            <li>
              <input type="checkbox" value="Wednesday" />
              {' '}
              W
            </li>
            <li>
              <input type="checkbox" value="Thursday" />
              {' '}
              T
            </li>
            <li>
              <input type="checkbox" value="Friday" />
              {' '}
              F
            </li>
            <li>
              <input type="checkbox" value="Saturday" />
              {' '}
              S
            </li>
            <li>
              <input type="checkbox" value="Sunday" />
              {' '}
              S
            </li>
          </ul>
        </div>
        <button type="submit" className="submitRoutine">Save</button>
      </form>
    </div>
  );
};

export default connect(null, { getAllUserRoutines })(Routine);
