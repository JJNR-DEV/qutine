import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const GoalsProgress = () => {
  const { goals } = useSelector(state => state.goals);
  const [checkedGoals, setCheckedGoals] = useState(0);
  const [amountOfGoals, setAmountOfGoals] = useState(0);

  const getProgress = () => {
    let checked = 0;
    let amount = 0;
    goals?.forEach(goal => {
      checked += goal.counterAmount;
      amount += parseInt(goal.amountOfTimes);
    });
    setCheckedGoals(checked);
    setAmountOfGoals(amount)
  };

  const createProgressBar = (checked, amount) => {
    if (amountOfGoals === 0) { return <p>Add some weekly goals to help you stay active and keep a good routine.</p>};
    if (checkedGoals === 0) { return <p>Pess the circles when you have completed part of your goal.</p>};
    return React.createElement(
      'div',
      {
        className: 'progressBar',
        style: {
          backgroundSize: `${checked / amount * 100}% 100%`,
        },
      },
    )
  }

  useEffect(() => {
    getProgress();
  }, [goals]);

  return (
    <div className="goalProgressContainer">
      {createProgressBar(checkedGoals, amountOfGoals)}
    </div>
  );
};

export default GoalsProgress;
