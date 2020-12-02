import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import './Navbar.css';
import {useHistory} from 'react-router-dom';
import {logout} from "../../actions/auth";
import logo from '../../logo.png';
import {useLocation} from "react-router";

const Navbar = () => {
  const {isLoggedIn, user} = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      return history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const parseColor = (isLoggedIn) => {
    if (isLoggedIn) {
      return {
        backgroundColor: 'transparent'
      };
    }
    return {
      backgroundColor: '#CAE4DB'
    };
  };

  return (
    <div className="navBar" style={parseColor(isLoggedIn)}>
      <img className="logo" src={logo} alt="logo"/>
      <ul>
        {!isLoggedIn && location.pathname !== '/'
          ? <li><NavLink className="navLink" exact to="/">Home</NavLink></li>
          : null
        }
        {isLoggedIn && <li><NavLink className="navLink" exact to="/dashboard">Dashboard</NavLink></li>}
        {isLoggedIn ? (
          <li>
            <span>{user.email}</span>
            <button className="small-btn"
                    type="button"
                    onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : !isLoggedIn && location.pathname === '/register' ? (
          <button className="small-btn"
                  type="button"
                  onClick={() => {
                    history.push('/login');
                  }}
          >
            Login
          </button>
        ) : null
        }
      </ul>
    </div>
  );
};

export default Navbar;
