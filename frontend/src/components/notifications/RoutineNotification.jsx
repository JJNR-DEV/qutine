import React from 'react';

const RoutineNotification = ({ routine }) => {

  return (
    <div className="notification">
      It's time to
      {' '}
      {routine.name}
      !
    </div>
  );
};

export default RoutineNotification;
