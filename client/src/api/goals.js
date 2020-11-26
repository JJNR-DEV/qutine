import axios from 'axios';

export const createGoal = (goal) => axios.post('/goals/new-goal', goal)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

  export const allGoals = () => axios.get('/goals/all-goals')
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));
  
  export const deleteGoal = name => axios.delete(`/goals/delete-goal/?name=${name}`)
  .then(() => console.log('Successfully deleted taks!'))
  .catch((err) => console.error(`${err.message}`));
  