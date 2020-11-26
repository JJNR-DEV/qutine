import axios from 'axios';

export const createRoutine = (routine) => axios.post('/routines/new-routine', routine)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const allRoutines = () => axios.get('/routines/all-routines')
  .then(res => res.data)
  .catch((err) => console.error(`${err.message}`));

export const allDayRoutines = today => axios.get(`/routines/all-day-routines/?today=${today}`)
  .then(res => res.data)
  .catch((err) => console.error(`${err.message}`));

export const deleteRoutine = async (name, today) => {
  const days = await axios.get(`/routines/get-selected-routine/?routine=${name}`);
  const newDays = days.data[0].days.filter(day => day !== today)

  if (days.data[0].days.length > 1) {
    axios.put('/routines/update-routine/', { name, days: newDays })
      .then(() => 'Successfully updated task removing it from the day!')
      .catch((err) => console.error(`${err.message}`));
  } else {
    axios.delete(`/routines/delete-routine/?name=${name}&day=${today}`)
      .then(() => 'Successfully deleted task for specified day!')
      .catch((err) => console.error(`${err.message}`));
  }
}
  