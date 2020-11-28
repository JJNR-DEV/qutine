import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Logout from '../logout/Logout';
import './Navbar.css';

const Navbar = () => {
    const {isLoggedIn, user} = useSelector((state) => state.auth);

    return (
        <div className="navBar">
            <ul className="linkList">
                <li>
                    {!isLoggedIn && <NavLink className='navLink' exact to="/">Home</NavLink>}
                </li>
                <li>
                    {isLoggedIn && <NavLink className='navLink' exact to="/dashboard">Dashboard</NavLink>}
                </li>
                <li>
                    {isLoggedIn && <NavLink className='navLink' to="/routine">Create Routine</NavLink>}
                </li>
                <li>
                    {isLoggedIn && <NavLink className='navLink' to="/goal">Create Goal</NavLink>}
                </li>
            </ul>
            {isLoggedIn && (
                <>
                    <span>{user.email}</span>
                    <Logout/>
                </>
            )}
        </div>
    );
};

export default Navbar;
