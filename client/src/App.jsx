require('dotenv').config();
import './App.css';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Snackbar from './components/snackbar/Snackbar';
import Goals from './components/goals/Goals';
import DashboardMobile from './components/dashboard/mobile/DashboardMobile';
import LandingPage from './components/landingPage/LandingPage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import 'react-toastify/dist/ReactToastify.css';
import RoutineNotification from './components/notifications/routineNotifications';
import { aknowledgeNotification } from "./api/routines";
import { getAllUserRoutines } from "./actions/routines";
import { getAllUserGoals } from "./actions/goals";
import axios from "axios";
const PORT = process.env.PORT || process.env.REACT_APP_PORT || 4000;

let ENDPOINT;

if (process.env.NODE_ENV === 'development') {
  ENDPOINT = `http://localhost:${PORT}`;
} else {
  // If production we don't need to specify port
  ENDPOINT = 'http://localhost';
}

const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Env variables", process.env);
    let socket;
    if (process.env.NODE_ENV === 'development') {
      socket = socketIOClient(ENDPOINT);
    } else {
      socket = socketIOClient();
    }
    if (isLoggedIn && user.email) {
      // update authorization header with latest token
      axios.defaults.headers.common['Authorization'] = user.accessToken;
      dispatch(getAllUserRoutines(user.email));
      dispatch(getAllUserGoals(user.email));
      socket.on(`routine-notification/${user.email}`, (routine) => {
        toast(<RoutineNotification className="notification" routine={routine}/>);
        aknowledgeNotification(routine);
      });
    }

    return () => socket.disconnect();
  }, [isLoggedIn, user]);

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Snackbar/>
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard/>
          </PrivateRoute>

          <PrivateRoute path="/mobile-dashboard">
            <DashboardMobile/>
          </PrivateRoute>

          <PrivateRoute path="/goal">
            <Goals/>
          </PrivateRoute>
          <Route path="/">
            <LandingPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
