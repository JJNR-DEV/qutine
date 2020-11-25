import axios from 'axios';

export const createRoutine = (routine) => axios.post('/new-routine', routine)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const allRoutines = () => axios.get('/new-routine/all-routines')
  .then(res => res.data)
  .catch((err) => console.error(`${err.message}`));
  