import React from 'react';
import { useSelector } from 'react-redux';
import './Snackbar.css';

const Snackbar = () => {
  const { success, message, show } = useSelector((state) => state.snackbar);

  return (
    <div id="snackbar" className={show ? 'show' : ''}>
      {message}
    </div>
  );
};

export default Snackbar;
