import axios from 'axios';

export const createRoutine = (routine) => axios.post('/routines/new-routine', routine)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const allRoutines = () => axios.get('/routines/all-routines')
  .then(res => res.data)
  .catch((err) => console.error(`${err.message}`));

export const deleteRoutine = name => axios.delete(`/routines/delete-routine/?name=${name}`)
  .then(() => console.log('Successfully deleted taks!'))
  .catch((err) => console.error(`${err.message}`));
  