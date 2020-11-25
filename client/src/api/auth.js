import axios from 'axios';

export const registerUser = (user) => axios.post('/api/user/register', user)
  .then((res) => {
    if (res.data) {
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        accessToken: res.data,
      }));
    }
    return res.data;
  })
  .catch((err) => console.error('Failed to register user!', err));

export const loginUser = (user) => axios.post('/api/user/login', user)
  .then((res) => {
    if (res.data) {
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        accessToken: res.data,
      }));
    }
    return res.data;
  })
  .catch((err) => console.error('Failed to login user!', err));

export const logout = () => {
  localStorage.removeItem('user');
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return {'x-access-token': user.accessToken};
  }
  return {};
};
