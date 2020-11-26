import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUserGoals } from '../../actions/goals';
import { deleteGoal } from '../../api/goals';

const GoalsDesktop = ({ getAllUserGoals, goals }) => {
  useEffect(() => {
    getAllUserGoals();
  }, [])
  const [categoryColor, setCategoryColor] = useState([{ home: 'blue' }, { work: 'yellow' }, { training: 'red' }]);

  const createGoal = (object) => {
    const {
      name, duration, category,
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);

    const eraseBtn = React.createElement(
      'button',
      {
        className: 'erase-btn',
        onClick: async () => {
          await deleteGoal(name);
          getAllUserGoals();
        },
        key: Math.random(),
      },
      'X',
    );

    const newModule = React.createElement(
      'div',
      {
        className: `goalModule ${category} ${duration}`,
        style: {
          borderLeft: `${colorMatch[0]} 5px solid`,
        },
        key: Math.random(),
      },
      name,
      eraseBtn
    );
    return newModule;
  };

  const appendGoalToBoard = () => goals?.map((goal) =>  createGoal(goal));

  return (
    <div className="weekGoalsContainer">
      Weekly Goals
      {appendGoalToBoard()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    goals: state.allUserGoals
  }
}

export default connect(mapStateToProps, { getAllUserGoals })(GoalsDesktop);
