import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUserGoals } from '../../actions/goals';

import Goal from './goals-desktop/Goal';

const GoalsDesktop = ({ getAllUserGoals, goals }) => {
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
      Weekly Goals
      {appendGoalToBoard()}
    </div>
  );
};

const mapStateToProps = state => {
  return { goals: state.allUserGoals }
}

export default connect(mapStateToProps, { getAllUserGoals })(GoalsDesktop);