import React from 'react';

import { createGoal } from '../../api/goals';
import { formValidation } from './goalsValidation';
import './Goals.css';

const Goals = () => {
    const handleSubmit = async e => {
        e.preventDefault();

        const name = document.querySelector('#goalName');
        const category = document.querySelector('#goalCategory');
        const valid = formValidation(name, category)
        if (valid) return;

        const weekDays = [...document.querySelectorAll('.selectionDays li input')];
        const selectedDays = weekDays.filter(day => day.checked);

        const goal = {
            name: name.value,
            category: category.value,
            sTime: document.querySelector('#goalStime').value,
            duration: document.querySelector('#goalDuration').value,
            days: selectedDays.map(day => day.value)
        }
        
        try {
            createGoal(goal)
        } catch(err) {
            console.error(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Enter a Goal</h1>
            <div className="form-fields">
                <label htmlFor="goalName">Name: </label>
                <input id="goalName" type="text" /><br/>
                <label htmlFor="goalCategory">Category: </label>
                <input id="goalCategory" type="text" /><br/>
                <label htmlFor="goalStime">Start Time: </label>
                <input id="goalStime" type="time" /><br/>
                <label htmlFor="goalDuration">Duration: </label>
                <input id="goalDuration" type="time" /><br/>
                <div className="selectionDays">
                    <span>Choose Days: </span>
                    <ul>
                        <li><input type="checkbox" value="Monday" /> Monday</li>
                        <li><input type="checkbox" value="Tuesday" /> Tuesday</li>
                        <li><input type="checkbox" value="Wednesday" /> Wednesday</li>
                        <li><input type="checkbox" value="Thursday" /> Thursday</li>
                        <li><input type="checkbox" value="Friday" /> Friday</li>
                        <li><input type="checkbox" value="Saturday" /> Saturday</li>
                        <li><input type="checkbox" value="Sunday" /> Sunday</li>
                    </ul>
                </div>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default Goals;