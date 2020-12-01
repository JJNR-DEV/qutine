import React, { useEffect, useState } from 'react';

const GoalsProgress = ({ goals }) => {
console.log(goals)
  let amountOfGoals;
  let checkedGoals;

  const getProgress = () => {
    goals.forEach(goal => {
      amountOfGoals += goal.amountOfTimes;
      checkedGoals += goal.counterAmount;
    });
    return {checkedGoals, amountOfGoals}
  }

  const createProgressBar = (checked, amount) => React.createElement(
    'div',
    {
      className: 'progressBar2',
      style: {
        backgroundSize: `${checked / amount * 100}% 100%`,
        backgroundImage: 'black',
        height: '20px',
        border: `1px solid black`,
      },
    },
  );

  useEffect(() => {
    getProgress()
  }, [goals])

  return (
    <div className="weekGoalsSection">
      {createProgressBar(checkedGoals, amountOfGoals)}
    </div>
  );
}

export default GoalsProgress;