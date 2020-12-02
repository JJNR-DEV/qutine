import React from 'react';
import { deleteGoal, updateIncrement } from '../../../api/goals';
import { useDispatch } from "react-redux";
import { getAllUserGoals } from "../../../actions/goals";

const Goal = ({ goalElements }) => {
  const dispatch = useDispatch();
  const categoryColor = [{ home: '#a0a0ff' }, { work: '#ffff7d' }, { training: '#ff9898' }];

  const {
    name, category, amountOfTimes, counterAmount,
  } = goalElements;

  const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);

  const eraseBtn = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));

    return React.createElement(
      'button',
      {
        className: 'eraseBtn',
        onClick: async () => {
          await deleteGoal(name, email);
          await dispatch(getAllUserGoals(email));
        },
        key: Math.random(),
      },
      <p>&#10005;</p>,
    );
  };

  const incrementBtn = (newCounter) => {
    const { email } = JSON.parse(localStorage.getItem('user'));

    if (newCounter > amountOfTimes) {
      return React.createElement(
        'button',
        {
          className: 'incrementBtn',
          onClick: async () => {
            await updateIncrement(name, email, newCounter);
            getAllUserGoals(email);
          },
          key: Math.random(),
        },
        <p>&#10003;</p>,
      );
    }

    return React.createElement(
      'button',
      {
        className: 'incrementBtn',
        onClick: async () => {
          await updateIncrement(name, email, newCounter);
          getAllUserGoals(email);
        },
        key: Math.random(),
      },
      <p>&#43;</p>,
    );
  };

  return (
    <div className={`${category} goalModule`}>
      <div className="goalMain">
        {name}
        {eraseBtn(name)}
      </div>
      {amountOfTimes !== ''
      && (
        <div className="goalAmount">
          {`${counterAmount} out of ${amountOfTimes} done this week.`}
          {incrementBtn(counterAmount + 1)}
        </div>
      )}
    </div>
  );
};

export default Goal;
