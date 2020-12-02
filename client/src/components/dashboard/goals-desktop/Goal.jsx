import React from 'react';
import { deleteGoal, updateIncrement } from '../../../api/goals';

const Goal = ({ goalElements, getAllUserGoals }) => {
  const {
    name, category, amountOfTimes, counterAmount,
  } = goalElements;

  const eraseBtn = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));

    return React.createElement(
      'button',
      {
        className: 'eraseBtn',
        onClick: async () => {
          await deleteGoal(name, email);
          getAllUserGoals(email);
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

  const handleCheckedGoals = (i) => {
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
  };
    // amountOfTimes, counterAmount

    // if (newCounter > amountOfTimes) {
    //   return React.createElement(
    //     'button',
    //     {
    //       className: 'incrementBtn',
    //       onClick: async () => {
    //         await updateIncrement(name, email, newCounter);
    //         getAllUserGoals(email);
    //       },
    //       key: Math.random(),
    //     },
    //     <p>&#10003;</p>,
    //   );
    // }

    // return React.createElement(
    //   'button',
    //   {
    //     className: 'incrementBtn',
    //     onClick: async () => {
    //       await updateIncrement(name, email, newCounter);
    //       getAllUserGoals(email);
    //     },
    //     key: Math.random(),
    //   },
    //   <p>&#43;</p>,
    // );

  return (
    <div className={`${category} goalModule`}>
      <div className="goalMain">
        {name}
        {eraseBtn(name)}
      </div>
      { amountOfTimes !== ''
        && (
        <div className="goalAmount">
          {createGoalCheckButtons()}
        </div>
        )}
    </div>
  );
};

export default Goal;
