import axios from 'axios';

export const loginUser = (user) => axios.post('/api/user/login', user)
  .then((res) => console.log(res.data))
  .catch((err) => console.error('Failed to login user!', err));

export const registerUser = (user) => axios.post('/api/user/register', user)
  .then((res) => console.log(res.data))
  .catch((err) => console.error('Failed to register user!', err));
