import React from 'react';
import './Routine.css';

const Routine = () => {
    const handleSubmit = e => {
        e.preventDefault();

        const weekDays = [...document.querySelectorAll('.selectionDays li input')];
        const selectedDays = weekDays.filter(day => day.checked);

        const routine = {
            name: document.querySelector('#routineName').value,
            category: document.querySelector('#routineCategory').value,
            sTime: document.querySelector('#routineStime').value,
            duration: document.querySelector('#routineDuration').value,
            days: selectedDays.map(day => day.value)
        }
        console.log(routine)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Enter a Habit</h1>
                <div className="form-fields">
                <label htmlFor="routineName">Name</label><br/>
                <input id="routineName" type="text" /><br/>
                <label htmlFor="routineCategory">Category</label><br/>
                <input id="routineCategory" type="text" /><br/>
                <label htmlFor="routineStime">Start Time</label><br/>
                <input id="routineStime" type="time" /><br/>
                <label htmlFor="routineDuration">Duration</label><br/>
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