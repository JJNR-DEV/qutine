import React, { useEffect, useState } from 'react';

const GoalsProgress = ({ goals }) => {
  const [checkedGoals, setCheckedGoals] = useState(0);
  const [amountOfGoals, setAmountOfGoals] = useState(0);

  const getProgress = () => {
    goals.forEach(goal => {
      setCheckedGoals(checkedGoals + goal.counterAmount);
      setAmountOfGoals(amountOfGoals + parseInt(goal.amountOfTimes));
    });
    console.log(amountOfGoals, checkedGoals, 'progress')
  }

  const createProgressBar = (checked, amount) => React.createElement(
    'div',
    {
      className: 'progressBar2',
      style: {
        backgroundImage: 'linear-gradient(45deg, #FFCF90, #E6B6A9)',
        backgroundSize: `${checked / amount * 100}% 100%`,
        height: '20px',
        width: '300px',
        borderRadius: '20px'
      },
    },
  );

  useEffect(() => {
    getProgress();
  }, [goals])

  return (
    <div className="weekGoalsSection">
      {createProgressBar(checkedGoals, amountOfGoals)}
    </div>
  );
}

export default GoalsProgress;