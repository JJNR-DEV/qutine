import React from 'react';
import { createGoal } from '../../api/goals';
import { formValidation } from './GoalsValidation';
import './Goals.css';

const Goals = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#goalName');
    const category = document.querySelector('#goalCategory');
    const valid = formValidation(name, category);
    if (valid) return;

    const weekDays = [...document.querySelectorAll('.selectionDays li input')];
    const selectedDays = weekDays.filter((day) => day.checked);

    const goal = {
      name: name.value,
      category: category.value,
      sTime: document.querySelector('#goalStime').value,
      duration: document.querySelector('#goalDuration').value,
      days: selectedDays.map((day) => day.value),
    };

    try {
      await createGoal(goal);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="addGoal">
      <h1 className="addGoalMessage">Enter a new weekly goal</h1>
      <form onSubmit={handleSubmit}>
        <input id="goalName" type="text" placeholder="Name" />
        <input id="goalCategory" type="text" placeholder="Category" />
        <input id="goalStime" type="time" placeholder="Start Time" />
        <input id="goalDuration" type="time" placeholder="Duration" />
        <div className="selectionDays">
          <span>Choose Days: </span>
          <ul>
            <li>
              <input type="checkbox" value="Monday" placeholder="Monday" />
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
        <button type="submit" className="submitGoal">Save</button>
      </form>
    </div>
  );
};

export default Goals;
