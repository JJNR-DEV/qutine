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
    top: '3%',
    right: '-42%',
    border: 'none',
    fontWeight: 'bold',
    background: 'none',
    fontSize: '18px'
  }

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sTime, setSTime] = useState('');
  const [duration, setDuration] = useState('');
  const [enableNotification, setEnableNotification] = useState(false);

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleSTime = e => setSTime(e.target.value);
  const handleDuration = e => setDuration(e.target.value);
  const handleEnableNotification = e => setEnableNotification(val => !val);

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
      activateNotification: enableNotification
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
        <h2 className="addRoutineMessage">New Habit to Routine</h2>
        <div className="newRoutineDetails">
          <label htmlFor="routinneName">Name</label>
          <input id="routineName" type="text" onChange={handleNameChange} />
          <br />
          <label htmlFor="routineCategory">Category</label>
          <select id="routineCategory" onChange={handleCategoryChange}>
            <option disabled defaultValue>Choose Category</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="exercise">Exercise</option>
            <option value="leisure">Leisure</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="routineStime">Start Time</label>
          <input id="routineStime" type="time" onChange={handleSTime} />
          <br />

          <label htmlFor="routineDuration">Duration</label>
          <input id="routineDuration" type="time" placeholder="0" />


          {/* {<label htmlFor="routineDuration" className="routineDuration-label" >Duration
            <div className="routineDuration-container">
              <input id="routineDuration" type="number" placeholder="0" />
              <span>Minutes</span>
            </div>
          </label>} */}

        </div>
        <div className="selectionDays">
          <span>Days</span>
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
        <label className="checkbox-container">Enable notification
          <input type="checkbox" checked={enableNotification} onChange={handleEnableNotification} />
          <span className="checkmark"/>
        </label>
        <button type="submit" className="submitRoutine">Save</button>
      </form>
    </div>
  );
};

export default connect(null, { getAllUserRoutines })(Routine);
