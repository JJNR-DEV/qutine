import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Goals from '../../goals/Goals';
import Goal from './Goal';
import GoalsProgress from './GoalsProgress';

const GoalsDesktop = () => {
  const { goals } = useSelector(state => state.goals);
  const { user } = useSelector((state) => state.auth);
  const [displayModal, setDisplayModal] = useState(false);

  const appendGoalToBoard = () => goals?.map(goal => {
    return (<Goal
      key={Math.random()}
      goalElements={goal}
    />)
  });

  return (
    <div className="weekGoalsContainer">
      <h2>Weekly Goals</h2>
      <GoalsProgress goals={goals} />
      <button className="createGoalBtn" onClick={() => setDisplayModal(!displayModal)}>Add Goal</button>
      {appendGoalToBoard()}
      <Goals show={displayModal} handleClose={() => setDisplayModal(false)} />
    </div>
  );
};

export default GoalsDesktop;
