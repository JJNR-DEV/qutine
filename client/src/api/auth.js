import axios from 'axios';

export const registerUser = (user) => axios.post('/api/user/register', user)
  .then(res => res.data)
  .catch(err => console.error('Failed to register user!', err));
