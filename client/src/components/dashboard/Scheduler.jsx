import React, { useState } from 'react';

const createWeek = () => weekDays.map((day) => React.createElement('div',
{
  className: `weekday ${day.day}`,
  key: day.day,
},
[day.day, appendHabitToWeek(day.day)]));

const timePole = () => {
const timeArr = [];
for (let i = 0; i < 25; i += 2) {
  timeArr.push(React.createElement('p', { className: 'time', key: i }, i));
}
return timeArr;
};

const Scheduler = () => {
    return (
        <div>
            
        </div>
    );
};

export default Scheduler;