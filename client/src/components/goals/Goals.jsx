import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getAllUserGoals } from '../../actions/goals';
import { createGoal } from '../../api/goals';
import { formValidation } from './GoalsValidation';
import './Goals.css';

const Goals = ({ handleClose, show, getAllUserGoals }) => {
  const showHideClassName = show ? "addGoal modal display-block" : " addGoal modal display-none";
  const buttonStyle = {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '1em',
    right: '-45%',
    fontWeight: 'bold',
    padding: '2px 5px'
  }

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amountOfTimes, setAmountOfTimes] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleTimesChange = e => setAmountOfTimes(e.target.value);

  const handleSubmit = async e => {
    console.log('got here')
    e.preventDefault();
    const valid = formValidation(e.target, { name, category });
    if (valid) return;

    const { email } = JSON.parse(localStorage.getItem('user'));
    const goal = {
      name,
      category,
      amountOfTimes,
      userEmail: email,
    };

    try {
      const { email } = JSON.parse(localStorage.getItem('user'));
      await createGoal(goal);
      getAllUserGoals(email);
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={showHideClassName}>
      <form onSubmit={handleSubmit}>
      <button onClick={handleClose} style={buttonStyle} type="button">&#10005;</button>
        <h1 className="addGoalMessage">Enter a new weekly goal</h1>
        <div className="newGoalDetails">
          <input id="goalName" type="text" placeholder="Name" onChange={handleNameChange} />
          <select id="goalCategory" type="text" placeholder="Category" onChange={handleCategoryChange}>
            <option disabled defaultValue>Choose Category</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="exercise">Exercise</option>
            <option value="leisure">Leisure</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          <input type="number" placeholder="Amount of times" onChange={handleTimesChange} />
        </div>
        <button type="submit" className="submitGoal">Save</button>
      </form>
    </div>
  );
};

export default connect(null, { getAllUserGoals })(Goals);
