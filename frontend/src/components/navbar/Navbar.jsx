import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import './Navbar.css';
import {useHistory} from 'react-router-dom';
import {useLocation} from "react-router";
import {USER_LOGOUT} from "../../actions/actionTypes";

const Navbar = () => {
  const {isLoggedIn, user} = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({
      type: USER_LOGOUT
    })
      .then(() => localStorage.removeItem('user'))
      .finally(() => history.push('/login'));
  };

  return (
    <div className="navBar">
      <ul>
        {!isLoggedIn && location.pathname === '/login'
          ? <li style={{padding: '0 20px '}}><NavLink className="navLink" exact to="/"
                                                      style={{color: '#fff'}}>Home</NavLink></li>
          : null
        }
        {!isLoggedIn && location.pathname === '/register'
          ? <li style={{padding: '0 20px '}}><NavLink className="navLink" exact to="/"
                                                      style={{color: '#00303F'}}>Home</NavLink></li>
          : null
        }
        {isLoggedIn && location.pathname === '/dashboard' ? (
          <li style={{
            display: 'flex',
            width: '230px'
          }}>
            <button className="small-btn"
                    type="button"
                    onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Navbar;
