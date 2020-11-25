import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logout from '../logout/Logout';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      <ul className="navLinks">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          {isLoggedIn && <NavLink exact to="/dashboard">Dashboard</NavLink>}
        </li>
        <li>
          {isLoggedIn && <NavLink to="/routine">Create Routine</NavLink>}
        </li>
        <li>
          {isLoggedIn && <NavLink to="/goal">Create Goal</NavLink>}
        </li>
      </ul>
      {isLoggedIn && <Logout />}
    </div>
  );
};

export default Navbar;
