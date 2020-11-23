import React from 'react';
import './Routine.css';
import { formValidation } from './routineValidation';

const Routine = () => {
    const handleSubmit = async e => {
        e.preventDefault();

        const name = document.querySelector('#routineName');
        const category = document.querySelector('#routineCategory');
        const sTime = document.querySelector('#routineStime');
        const duration = document.querySelector('#routineDuration');
        const valid = formValidation(name, category, sTime, duration);
        if (valid) return;

        const weekDays = [...document.querySelectorAll('.selectionDays li input')];
        const selectedDays = weekDays.filter(day => day.checked);

        const routine = {
            name: name.value,
            category: category.value,
            sTime: sTime.value,
            duration: duration.value,
            days: selectedDays.map(day => day.value)
        }
        
        // const response = await fetch('http://localhost:3001/new-routine', {
        //    method: 'POST',
        //    body: routine
        // })

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Enter a Habit</h1>
                <div className="form-fields">
                <label htmlFor="routineName">Name</label>
                <input id="routineName" type="text" /><br/>
                <label htmlFor="routineCategory">Category</label>
                <input id="routineCategory" type="text" /><br/>
                <label htmlFor="routineStime">Start Time</label>
                <input id="routineStime" type="time" /><br/>
                <label htmlFor="routineDuration">Duration</label>
                <input id="routineDuration" type="time" /><br/>
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

export default Routine;