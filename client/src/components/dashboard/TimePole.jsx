import React from 'react';

const TimePole = () => {

  const addZero = (index) => {
    let newNum;
    if (index.toString().length < 2) {
      newNum = `0${index}`;
    } else {
      newNum = `${index}`;
    }
    return newNum;
  };

  const timePole = () => {
    const timeArr = [];
    for (let i = 0; i < 25; i++) {
      timeArr.push(React.createElement('p', { className: 'time', key: i }, `${addZero(i)}.00`));
    }
    return timeArr;
  };
  
  return (
    <div className="timePole"> 
      {timePole()}
    </div>
  );
};

export default TimePole;
      