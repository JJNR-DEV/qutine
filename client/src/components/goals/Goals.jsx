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
    top: '3%',
    right: '-42%',
    fontWeight: 'bold',
    padding: '2px 5px',
    border: 'none',
    background: 'none',
    fontSize: '18px'
  }

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amountOfTimes, setAmountOfTimes] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleTimesChange = e => setAmountOfTimes(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const valid = formValidation({ name, category });
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
        <h2 className="addGoalMessage">New Goal</h2>
        <div className="newGoalDetails">
          <label htmlFor="goalName">Name</label>
          <input id="goalName" type="text" onChange={handleNameChange} />
          <br />

          <label htmlFor="goalCategory">Category</label>
          <select id="goalCategory" onChange={handleCategoryChange}>
            <option disabled defaultValue>Choose Category</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="training">Training</option>
          </select>

          <label htmlFor="amountOfTimes">Amount of times</label>
          <input id="amountOfTimes" type="number" placeholder="0" onChange={handleTimesChange} />
        </div>
        <button type="submit" className="submitGoal">Save</button>
      </form>
    </div>
  );
};

export default connect(null, { getAllUserGoals })(Goals);
