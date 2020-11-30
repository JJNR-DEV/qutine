import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUserGoals } from '../../../actions/goals';

import Goal from './Goal';

const GoalsDesktop = ({ getAllUserGoals, goals }) => {

  // const testGoal = [
  //   {
  //     name: 'Clean',
  //     category: 'home',
  //     amount: 4,
  //     checked: 2
  //   },
  //   {
  //     name: 'Work out',
  //     category: 'training',
  //     amount: 10,
  //     checked: 6
  //   },
  //   {
  //     name: 'Read',
  //     category: 'work',
  //     amount: 3,
  //     checked: 1
  //   },
  // ]

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    getAllUserGoals(email);
  }, [])

  const appendGoalToBoard = () => goals?.map(goal => <Goal 
    key={Math.random()} 
    goalElements={goal} 
    getAllUserGoals={getAllUserGoals} 
  /> );

  // const appendGoalToBoard = () => testGoal?.map((goal) =>  createGoal(goal));

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