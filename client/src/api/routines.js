import axios from 'axios';

export const createRoutine = (routine) => axios.post('/routines/new-routine', routine)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const allRoutines = (email) => axios.get(`/routines/all-routines/?userEmail=${email}`)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const allDayRoutines = (today, email) => axios.get(`/routines/all-day-routines/?userEmail=${email}&today=${today}`)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const deleteRoutine = async (name, today) => {
  const days = await axios.get(`/routines/get-selected-routine/?routine=${name}`);
  const newDays = days.data[0].days.filter((day) => day !== today);

  if (days.data[0].days.length > 1) {
    axios.put('/routines/update-routine/', { name, days: newDays })
      .then(() => 'Successfully updated task removing it from the day!')
      .catch((err) => console.error(`${err.message}`));
  } else {
    axios.delete(`/routines/delete-routine/?name=${name}&day=${today}`)
      .then(() => 'Successfully deleted task for specified day!')
      .catch((err) => console.error(`${err.message}`));
  }
};

export const completedRoutineProgress = (routine) => axios.post('/routine/progress/complete', routine)
  .then((res) => res.data);

export const incompleteRoutineProgress = (routine) => axios.post('/routine/progress/incomplete', routine)
  .then((res) => res.data);
