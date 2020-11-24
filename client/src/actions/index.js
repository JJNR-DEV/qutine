import axios from 'axios';

export const loginUser = user => dispatch => axios.post('/api/user/login', user)
  .then(res => {
    console.log('== loginUser Action ==')
    dispatch({
      type: 'USER_LOGIN',
      payload: res.data
    })
  })
  .catch(err => console.error('Failed to login user!', err));