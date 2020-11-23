import axios from 'axios';

export const registerUser = (user) => {
  return axios.post('/api/user/register', user)
    .then(res => console.log(res.data))
    .catch(err => console.error('Failed to register user!', err));
}

export const loginUser = (user) => {
  return axios.post('/api/user/login', user)
    .then(res => console.log(res.data))
    .catch(err => console.error('Failed to login user!', err));
}
