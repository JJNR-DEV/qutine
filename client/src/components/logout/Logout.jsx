import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth';
import './Logout.css';

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
      <button className="small-btn" type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
