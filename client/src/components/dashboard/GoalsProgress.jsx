import React, { useEffect, useState } from 'react';

const GoalsProgress = ({ goals }) => {
  const [checkedGoals, setCheckedGoals] = useState(0);
  const [amountOfGoals, setAmountOfGoals] = useState(0);

  const getProgress = () => {
    let checked = 0;
    let amount = 0;
    goals.forEach(goal => {
      checked += goal.counterAmount;
      amount += parseInt(goal.amountOfTimes);
    });
    setCheckedGoals(checked);
    setAmountOfGoals(amount)
    console.log(amountOfGoals, checkedGoals, goals, 'progress')
  }

  const createProgressBar = (checked, amount) => React.createElement(
    'div',
    {
      className: 'progressBar',
      style: {
        backgroundSize: `${checked / amount * 100}% 100%`,
      },
    },
  );

  useEffect(() => {
    getProgress();
  }, [goals])

  return (
    <div className="goalProgressContainer">
      {createProgressBar(checkedGoals, amountOfGoals)}
    </div>
  );
}

export default GoalsProgress;