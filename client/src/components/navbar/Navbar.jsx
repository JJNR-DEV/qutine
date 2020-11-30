import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Logout from '../logout/Logout';
import './Navbar.css';
import {useHistory} from 'react-router-dom';

const Navbar = () => {
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const history = useHistory();

    return (
        <div className="navBar">
            <ul className="linkList">
                <li>
                    {!isLoggedIn && <NavLink className="navLink" exact to="/">Home</NavLink>}
                </li>
                <li>
                    {isLoggedIn && <NavLink className="navLink" exact to="/dashboard">Dashboard</NavLink>}
                </li>
            </ul>
            {isLoggedIn ? (
                <>
                    <span>{user.email}</span>
                    <Logout/>
                </>
            ) : (
                <button className="logoutButton"
                        type="button"
                        onClick={() => {
                            history.push('/login')
                        }}
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default Navbar;
