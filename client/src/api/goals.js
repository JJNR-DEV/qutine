import axios from 'axios';

export const createGoal = (goal) => axios.post('/new-goal', goal)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

  export const allGoals = () => axios.get('/new-goal/all-goals')
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));
  