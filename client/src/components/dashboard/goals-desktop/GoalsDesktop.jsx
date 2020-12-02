import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllUserGoals } from '../../../actions/goals';
import Goals from '../../goals/Goals';
import Goal from './Goal';
import DayRoutine from '../day-routine/DayRoutine';
import GoalsProgress from '../GoalsProgress';


const GoalsDesktop = ({ getAllUserGoals, goals }) => {
  const [ displayModal, setDisplayModal ] = useState(false);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    getAllUserGoals(email);
  }, [])

  const appendGoalToBoard = () => goals?.map(goal => <Goal 
    key={Math.random()}
    goalElements={goal}
    getAllUserGoals={getAllUserGoals}
  /> );

  return (
    <div className="weekGoalsContainer">
      <h2>Weekly Goals</h2>
      <GoalsProgress goals={goals} />
      {appendGoalToBoard()}
      <button className="createGoalBtn" onClick={() => setDisplayModal(!displayModal)}>Add Goal</button>
      <Goals show={displayModal} handleClose={() => setDisplayModal(false)} />
      <DayRoutine />
    </div>
  );
};

const mapStateToProps = state => {
  return { goals: state.allUserGoals }
}

export default connect(mapStateToProps, { getAllUserGoals })(GoalsDesktop);