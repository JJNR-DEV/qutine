import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      return history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Logout;
