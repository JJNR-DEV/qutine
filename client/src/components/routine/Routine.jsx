import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Routine.css';
import { createRoutine } from '../../api/routines';
import { formValidation } from './RoutineValidation';
import { weekDays } from "../../common/routine-utils";
import { getAllUserRoutines } from "../../actions/routines";

const Routine = ({ handleClose, show }) => {
  const showHideClassName = show ? "addRoutine modal display-block" : "addRoutine modal display-none";
  const buttonStyle = {
    position: 'relative',
    top: '3%',
    right: '-42%',
    border: 'none',
    fontWeight: 'bold',
    background: 'none',
    fontSize: '18px'
  };
  const { routines } = useSelector((state) => state.routines);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sTime, setSTime] = useState('');
  const [duration, setDuration] = useState('');
  const [enableNotification, setEnableNotification] = useState(false);
  const [selectedDays, setSelectedDays] = useState(weekDays.map(day => {
    return {
      day: day,
      checked: false
    };
  }));

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleSTime = e => setSTime(e.target.value);
  const handleDuration = e => setDuration(e.target.value);
  const handleEnableNotification = e => setEnableNotification(val => !val);

  const handleSubmit = async e => {
    e.preventDefault();
    const weekDays = [...document.querySelectorAll('.selectionDays li input')];
    const selectedDays = weekDays.filter((day) => day.checked);

    const valid = formValidation({ name, category, sTime, duration }, selectedDays);
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
      await getAllUserRoutines(email);
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOnDaysChecked = (e) => {
    const day = e.target.value;
    const checked = e.target.checked;
    setSelectedDays(selectedDays => selectedDays.map(selectedDay => {
      if (selectedDay.day === day) {
        selectedDay.checked = checked;
        return selectedDay;
      }
      return selectedDay;
    }));
  };

  return (
    <div className={showHideClassName}>
      <form onSubmit={handleSubmit}>
        <button onClick={handleClose} style={buttonStyle} type="button">&#10005;</button>
        <h2 className="addRoutineMessage">New Habit to Routine</h2>
        <div className="newRoutineDetails">
          <label htmlFor="routinneName">Name</label>
          <input id="routineName" type="text" onChange={handleNameChange}/>
          <br/>
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
          <input id="routineStime" type="time" onChange={handleSTime}/>
          <br/>

          <label htmlFor="routineDuration">Duration</label>
          <input id="routineDuration" type="time" placeholder="0" onChange={handleDuration}/>
        </div>
        <div className="selectionDays">
          <span>Days</span>
          <ul>
            {selectedDays.map(selectedDay => {
              return (
                <li key={selectedDay.day}
                >
                  <input type="checkbox"
                         checked={selectedDay.checked}
                         value={selectedDay.day}
                         onChange={handleOnDaysChecked}
                  />
                  {selectedDay.day.charAt(0)}
                </li>
              );
            })}
          </ul>
        </div>
        <label className="checkbox-container">Enable notification
          <input type="checkbox" checked={enableNotification} onChange={handleEnableNotification}/>
          <span className="checkmark"/>
        </label>
        <button type="submit" className="submitRoutine">Save</button>
      </form>
    </div>
  );
};

export default Routine;
