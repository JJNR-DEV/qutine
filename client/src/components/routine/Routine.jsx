import React from 'react';
import './Routine.css';
import { createRoutine } from '../../api/routines';
import { formValidation } from './RoutineValidation';
import {useHistory} from "react-router-dom";

const Routine = () => {
  const history = useHistory();

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
      history.push('/dashboard');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="addRoutine">
      <h1 className="addRoutineMessage">Enter a routine for your week</h1>
      <form onSubmit={handleSubmit}>
        <input id="routineName" type="text" placeholder="Name" />
        <input id="routineCategory" type="text" placeholder="Category" />
        <input id="routineStime" type="time" placeholder="Start Time" />
        <input id="routineDuration" type="time" placeholder="Duration" />
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

export default Routine;
