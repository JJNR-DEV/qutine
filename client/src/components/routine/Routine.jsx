import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Routine.css';
import { createRoutine } from '../../api/routines';
import { formValidation } from './RoutineValidation';
import { routineCategories, weekDays } from "../../common/routine-utils";
import { getAllUserRoutines } from "../../actions/routines";

const Routine = ({
                   handleClose,
                   show,
                   selectedRoutine = null
                 }) => {
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
  const dispatch = useDispatch();
  const { routines } = useSelector((state) => state.routines);
  const { user } = useSelector((state) => state.auth);
  const id = selectedRoutine ? selectedRoutine._id : null;
  const [name, setName] = useState(selectedRoutine ? selectedRoutine.name : '');
  const [category, setCategory] = useState(selectedRoutine ? selectedRoutine.category : 'home');
  const [startTime, setStartTime] = useState(selectedRoutine ? selectedRoutine.startTime : '');
  const [duration, setDuration] = useState(selectedRoutine ? selectedRoutine.duration : '');
  const [enableNotification, setEnableNotification] = useState(selectedRoutine ? selectedRoutine.activateNotification : false);
  const [selectedDays, setSelectedDays] = useState(
    selectedRoutine ?
      weekDays.map(day => {
        return {
          day: day,
          checked: selectedRoutine.days.some(r => r === day),
        };
      })
      :
      weekDays.map(day => {
        return {
          day: day,
          checked: false
        };
      }));

  // const [name, setName] = useState('');
  // const [category, setCategory] = useState('Home');
  // const [sTime, setSTime] = useState('');
  // const [duration, setDuration] = useState('');
  // const [enableNotification, setEnableNotification] = useState(false);

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleStartTime = e => setStartTime(e.target.value);
  const handleDuration = e => setDuration(e.target.value);
  const handleEnableNotification = e => setEnableNotification(val => !val);

  const handleSubmit = async e => {
    e.preventDefault();
    const days = selectedDays
      .filter(selectedDay => selectedDay.checked)
      .map(selectedDay => selectedDay.day);

    const valid = formValidation({ name, category, sTime: startTime, duration }, days);
    if (valid) return;

    const routine = {
      id: id,
      name,
      category,
      sTime: startTime,
      duration,
      days: days,
      userEmail: user.email,
      activateNotification: enableNotification
    };

    try {
      await createRoutine(routine);
      dispatch(getAllUserRoutines(user.email));
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
          <input id="routineName" type="text" value={name} onChange={handleNameChange}/>
          <br/>
          <label htmlFor="routineCategory">Category</label>
          <select id="routineCategory" value={category} onChange={handleCategoryChange}>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="exercise">Exercise</option>
            <option value="leisure">Leisure</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="routineStime">Start Time</label>
          <input id="routineStime" type="time" value={startTime} onChange={handleStartTime}/>
          <br/>
          <label htmlFor="routineDuration">Duration</label>
          <input id="routineDuration" type="time" placeholder="0" value={duration} onChange={handleDuration}/>
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
