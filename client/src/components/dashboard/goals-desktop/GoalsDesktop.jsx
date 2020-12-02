import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Goals from '../../goals/Goals';
import Goal from './Goal';
import DayRoutine from '../day-routine/DayRoutine';
import GoalsProgress from '../GoalsProgress';


const GoalsDesktop = () => {
  const { goals } = useSelector(state => state.goals);
  const { user } = useSelector((state) => state.auth);
  const [displayModal, setDisplayModal] = useState(false);

  const appendGoalToBoard = () => goals?.map(goal => <Goal
    key={Math.random()}
    goalElements={goal}
  />);

  return (
    <div className="weekGoalsContainer">
      <span>{user.email}</span>
      <h2>Weekly Goals</h2>
      <GoalsProgress goals={goals}/>
      {appendGoalToBoard()}
      <button className="createGoalBtn" onClick={() => setDisplayModal(!displayModal)}>Add Goal</button>
      <Goals show={displayModal} handleClose={() => setDisplayModal(false)}/>
      <DayRoutine/>
    </div>
  );
};

export default GoalsDesktop;
