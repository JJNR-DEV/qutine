import axios from 'axios';

export const createGoal = (goal) => axios.post('/new-goal', goal)
  .then((res) => console.log(res.data))
  .catch((err) => console.error(`${err.message}`));
