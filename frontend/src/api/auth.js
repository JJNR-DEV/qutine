import axios from 'axios';

export const registerUser = (user) => axios.post('/api/user/register', user);

export const loginUser = (user) => axios.post('/api/user/login', user);
