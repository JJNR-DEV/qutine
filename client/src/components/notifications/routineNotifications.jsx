import React from 'react';
import { updateRoutineProgress } from '../../api/routines';

const RoutineNotification = ({ closeToast, routine }) => {
  const mapRoutineProgress = (routineData) => ({
    routineId: routineData._id,
    routineName: routineData.name,
    userEmail: routineData.userEmail,
  });

  return (
    <div>
      Have you completed
      {' '}
      {routine.name}
      ?
      <div style={{ marginTop: '10px' }}>
        <button
          type="button"
          onClick={() => {
            const routineProgress = mapRoutineProgress(routine);
            routineProgress.status = 'COMPLETE';
            updateRoutineProgress(routineProgress)
              .finally(() => closeToast());
          }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => {
            const routineProgress = mapRoutineProgress(routine);
            routineProgress.status = 'INCOMPLETE';
            updateRoutineProgress(routineProgress)
              .finally(() => closeToast());
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default RoutineNotification;
