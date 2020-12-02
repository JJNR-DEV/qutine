import axios from 'axios';

export const createGoal = (goal) => axios.post('/goals/new-goal', goal)
  .then((res) => res.data)
  .catch(err => err.response.data.message);

export const allGoals = (email) => axios.get(`/goals/all-goals/?userEmail=${email}`)
  .then((res) => res.data)
  .catch((err) => console.error(`${err.message}`));

export const deleteGoal = (name, email) => axios.delete(`/goals/delete-goal/?userEmail=${email}&name=${name}`)
  .then(() => console.log('Successfully deleted taks!'))
  .catch((err) => console.error(`${err.message}`));

export const updateIncrement = (name, email, newCounter) => axios.put('/goals/increment-goal', { name, email, newCounter })
  .then(() => console.log(newCounter, 'Successfully updated counter!'))
  .catch((err) => console.error(`${err.message}`));
