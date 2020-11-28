import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGoal } from '../../api/goals';
import { formValidation } from './GoalsValidation';
import './Goals.css';

const Goals = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amountOfTimes, setAmountOfTimes] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleTimesChange = e => setAmountOfTimes(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = formValidation(e.target, { name, category });
    if (valid) return;

    const { email } = JSON.parse(localStorage.getItem('user'));  
    const goal = {
      name,
      category,
      amountOfTimes,
      userEmail: email
    };

    try {
      await createGoal(goal);
      history.push('/dashboard');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="addGoal">
      <h1 className="addGoalMessage">Enter a new weekly goal</h1>
      <form onSubmit={handleSubmit}>
        <input id="goalName" type="text" placeholder="Name" onChange={handleNameChange} />
        <input id="goalCategory" type="text" placeholder="Category" onChange={handleCategoryChange} />
        <input type="number" placeholder="Amount of times" onChange={handleTimesChange} />
        <button type="submit" className="submitGoal">Save</button>
      </form>
    </div>
  );
};

export default Goals;
