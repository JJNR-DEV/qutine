import React from 'react';

const RoutineNotification = ({ routine }) => {

  return (
    <div className="notification">
      It's time for
      {' '}
      {routine.name}
      !
    </div>
  );
};

export default RoutineNotification;
