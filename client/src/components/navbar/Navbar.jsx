import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {useHistory} from 'react-router-dom';
import {logout} from "../../actions/auth";
import {useLocation} from "react-router";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
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

  return (
    <div className="navBar">
      <ul>
        {!isLoggedIn && location.pathname === '/login'
          ? <li style={{ padding: '0 20px '}}><NavLink className="navLink" exact to="/" style={{color: '#fff'}}>Home</NavLink></li>
          : null
        }
        {!isLoggedIn && location.pathname === '/register'
          ? <li style={{ padding: '0 20px '}}><NavLink className="navLink" exact to="/" style={{color: '#00303F'}}>Home</NavLink></li>
          : null
        }
        {isLoggedIn && location.pathname === '/dashboard' ? (
          <li>
            <button className="small-btn"
                    type="button"
                    style={{ 
                      top: '45px',
                      left: '60px',
                      textDecoration: 'underline',
                      position: 'relative',
                      fontWeight: 'bold'
                    }}
                    onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : null} {/* !isLoggedIn && location.pathname === '/register' ? (
          <button className="small-btn"
                  type="button"
                  onClick={() => {
                    history.push('/login');
                  }}
          >
            Login
          </button>
        ) : null
        } */}
      </ul>
    </div>
  );
};

export default Navbar;
