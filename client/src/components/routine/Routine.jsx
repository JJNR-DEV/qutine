import React from 'react';
import './Routine.css';
import { createRoutine } from '../../api/routines';
import { formValidation } from './RoutineValidation';

const Routine = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#routineName');
    const category = document.querySelector('#routineCategory');
    const sTime = document.querySelector('#routineStime');
    const duration = document.querySelector('#routineDuration');
    const valid = formValidation(name, category, sTime, duration);
    if (valid) return;

    const weekDays = [...document.querySelectorAll('.selectionDays li input')];
    const selectedDays = weekDays.filter((day) => day.checked);

    const routine = {
      name: name.value,
      category: category.value,
      sTime: sTime.value,
      duration: duration.value,
      days: selectedDays.map((day) => day.value),
    };

    try {
      await createRoutine(routine);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Enter a Habit</h1>
      <div className="form-fields">
        <label htmlFor="routineName">
          Name
          <input id="routineName" type="text" />
        </label>
        <br />
        <label htmlFor="routineCategory">
          Category
          <input id="routineCategory" type="text" />
        </label>
        <br />
        <label htmlFor="routineStime">
          Start Time
          <input id="routineStime" type="time" />
        </label>
        <br />
        <label htmlFor="routineDuration">
          Duration
          <input id="routineDuration" type="time" />
        </label>
        <br />
        <div className="selectionDays">
          <span>Choose Days: </span>
          <ul>
            <li>
              <input type="checkbox" value="Monday" />
              {' '}
              Monday
            </li>
            <li>
              <input type="checkbox" value="Tuesday" />
              {' '}
              Tuesday
            </li>
            <li>
              <input type="checkbox" value="Wednesday" />
              {' '}
              Wednesday
            </li>
            <li>
              <input type="checkbox" value="Thursday" />
              {' '}
              Thursday
            </li>
            <li>
              <input type="checkbox" value="Friday" />
              {' '}
              Friday
            </li>
            <li>
              <input type="checkbox" value="Saturday" />
              {' '}
              Saturday
            </li>
            <li>
              <input type="checkbox" value="Sunday" />
              {' '}
              Sunday
            </li>
          </ul>
        </div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Routine;
