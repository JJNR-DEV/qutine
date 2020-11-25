import React, { useState } from 'react';

const GoalsDesktop = () => {
  const [goals, setGoals] = useState([{name: 'test', duraton: '3', category: 'home'}]);
  const [categoryColor, setCategoryColor] = useState([{ home: 'blue' }, { work: 'yellow' }, { training: 'red' }]);

  const createGoal = (object) => {
    const {
      name, duration, category,
    } = object;
    const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);
    const newModule = React.createElement(
      'div',
      {
        className: `goalModule ${category} ${duration}`,
        style: {
          borderLeft: `${colorMatch[0]} 5px solid`,
        },
        key: Date.now(),
      },
      name,
    );
    return newModule;
  };

  const appendGoalToBoard = () => goals.map((goal) =>  createGoal(goal));

  return (
    <div className="weekGoalsContainer">
      Weekly Goals
      {appendGoalToBoard()}
    </div>
  );
};

export default GoalsDesktop;
