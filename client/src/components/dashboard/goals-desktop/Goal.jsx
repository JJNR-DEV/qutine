import React from 'react';
import { deleteGoal, updateIncrement } from '../../../api/goals';
import { useDispatch, useSelector } from "react-redux";
import { getAllUserGoals } from "../../../actions/goals";

const Goal = ({ goalElements }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const {
    _id, name, category, amountOfTimes, counterAmount,
  } = goalElements;

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

  const incrementCheckedGoal = async (e) => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    if (e.target.checked) {
      await updateIncrement(name, email, counterAmount + 1);
      return getAllUserGoals(email);
    } else {
      await updateIncrement(name, email, counterAmount - 1);
      return getAllUserGoals(email);
    }
  }

  const handleCheckedGoals = i => {
    if(counterAmount > i) {
      return true
    };
    return false;
  };

  const createGoalCheckButtons = () => {
    let checkArr = [];
    for (let i = 0; i < parseInt(amountOfTimes); i++) {
      checkArr.push(
        <input 
          key={i} 
          type='checkbox'
          id={`checkedGoal${i}`} 
          className='checkGoal'
          checked={handleCheckedGoals(i)}
          onChange={incrementCheckedGoal}>
        </input> 
      );
    }
    return checkArr;
  }

  return (
    <div className={`${category} goalModule`}>
      <div className="goalMain">
        {name}
        {eraseBtn(name)}
      </div>
      {amountOfTimes !== ''
      && (
        <div className="goalAmount">
          {createGoalCheckButtons()}
        </div>
      )}
    </div>
  );
};

export default Goal;
