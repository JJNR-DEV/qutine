import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import './Navbar.css';
import {useHistory} from 'react-router-dom';
import {logout} from "../../actions/auth";
import logo from '../../logo.png';

const Navbar = () => {
  const {isLoggedIn, user} = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      return history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navBar">
      <img className="logo" src={logo} alt="logo"/>
      <ul style={{marginLeft: '30px'}}>

        {!isLoggedIn && <li><NavLink className="navLink" exact to="/">Home</NavLink></li>}
        {isLoggedIn && <li><NavLink className="navLink" exact to="/dashboard">Dashboard</NavLink></li>}
      </ul>
      <ul style={{marginRight: '30px'}}>
        {isLoggedIn ? (
          <li style={{float: 'right'}}>
            <span>{user.email}</span>
            <button className="small-btn"
                    type="button"
                    onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <button className="small-btn"
                  type="button"
                  onClick={() => {
                    history.push('/login');
                  }}
          >
            Login
          </button>
        )}
      </ul>


    </div>
  );
};

export default Navbar;
