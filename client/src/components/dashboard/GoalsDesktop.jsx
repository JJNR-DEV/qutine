import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUserGoals } from '../../actions/goals';
import { deleteGoal } from '../../api/goals';

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
    getAllUserGoals();
  }, [])
  const [categoryColor, setCategoryColor] = useState([{ home: '#a0a0ff' }, { work: '#ffff7d' }, { training: '#ff9898' }]);

  const createRemoveButton = (name) => {
    return React.createElement(
      'button',
      {
        className: 'eraseBtn',
        onClick: async () => {
          await deleteGoal(name);
          getAllUserGoals();
        },
        key: Math.random(),
      },
      <p>&#10005;</p>
    );
  }


  const progressBar = (checked, amount, category) => {
    return React.createElement(
      'div',
      {
        className: 'progressBar',
        style: {
          backgroundSize: `${checked / amount * 100}% 100%`,
          backgroundImage: `linear-gradient(45deg, #fff, ${category})`,
          border: `1px solid ${category}`,
        }
      }
    )
  }

  const createGoal = (object) => {
    const {
      name,
      category,
      checked,
      amount
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const newModule = React.createElement(
      'div',
      {
        className: `goalModule ${category}`,
        key: Math.random(),
      },
      createRemoveButton(name),
      name,
      progressBar(checked, amount, colorMatch),
    );
    return newModule;
  };

  const appendGoalToBoard = () => goals?.map((goal) =>  createGoal(goal));
  // const appendGoalToBoard = () => testGoal?.map((goal) =>  createGoal(goal));

  return (
    <div className="weekGoalsContainer">
      Weekly Goals
      {appendGoalToBoard()}
      {createGoal(goals)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    goals: state.allUserGoals
  }
}

export default connect(mapStateToProps, { getAllUserGoals })(GoalsDesktop);
