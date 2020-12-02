import React from 'react';
import { deleteGoal, updateIncrement } from '../../../api/goals';
import { useDispatch, useSelector } from "react-redux";
import { getAllUserGoals } from "../../../actions/goals";

const Goal = ({ goalElements }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const categoryColor = [{ home: '#a0a0ff' }, { work: '#ffff7d' }, { training: '#ff9898' }];

  const {
    _id, name, category, amountOfTimes, counterAmount,
  } = goalElements;

  const colorMatch = categoryColor.map((color) => color[category]).filter((color) => color);

  const eraseBtn = () => {
    return React.createElement(
      'button',
      {
        className: 'eraseBtn',
        onClick: async () => {
          await deleteGoal(name, user.email);
          await dispatch(getAllUserGoals(user.email));
        },
        key: Math.random(),
      },
      <p>&#10005;</p>,
    );
  };

  const incrementBtn = (newCounter) => {

    if (newCounter > amountOfTimes) {
      return React.createElement(
        'button',
        {
          className: 'incrementBtn',
          onClick: async () => {
            await updateIncrement(_id, name, user.email, newCounter);
            await dispatch(getAllUserGoals(user.email));
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
          await updateIncrement(_id, name, user.email, newCounter);
          await dispatch(getAllUserGoals(user.email));
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
