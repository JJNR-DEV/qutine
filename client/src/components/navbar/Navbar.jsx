import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logout from '../logout/Logout';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import { logout } from "../../actions/auth";

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
            <ul>
                {!isLoggedIn && <li><NavLink className="navLink" exact to="/">Home</NavLink></li>}
                {isLoggedIn && <li><NavLink className="navLink" exact to="/dashboard">Dashboard</NavLink></li>}
            </ul>
            <div style={{marginLeft: 'auto'}}>
                {isLoggedIn ? (
                    <>
                        <span>{user.email}</span>
                        <button className="small-btn"
                                type="button"
                                onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="logoutButton"
                            type="button"
                            onClick={() => {
                                history.push('/login');
                            }}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
