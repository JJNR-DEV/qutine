import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/navbar/Navbar';

import Dashboard from './components/dashboard/Dashboard';
import Snackbar from './components/snackbar/Snackbar';
import Goals from './components/goals/Goals';
import Routine from './components/routine/Routine';
import DashboardMobile from './components/dashboard/mobile/DashboardMobile';
import LandingPage from './components/landingPage/LandingPage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import 'react-toastify/dist/ReactToastify.css';
import { completedRoutineProgress, incompleteRoutineProgress } from './api/routines';

const ENDPOINT = 'http://localhost:4000';

const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    if (isLoggedIn) {
      socket.on(`routine-notification/${user.email}`, (routine) => {
        toast(<RoutineNotification routine={routine} />);
      });
    }

    return () => socket.disconnect();
  }, []);

  const RoutineNotification = ({ closeToast, routine }) => {
    const mapRoutineProgress = (routineData) => ({
      routineId: routineData._id,
      routineName: routineData.name,
      userEmail: routineData.userEmail,
    });

    return (
      <div>
        Have you completed
        {' '}
        {routine.name}
        ?
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => {
            const routineProgress = mapRoutineProgress(routine);
            completedRoutineProgress(routineProgress)
              .finally(() => closeToast());
          }}
          >
            Yes
          </button>
          <button onClick={() => {
            const routineProgress = mapRoutineProgress(routine);
            incompleteRoutineProgress(routineProgress)
              .finally(() => closeToast());
          }}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Snackbar />
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
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute path="/mobile-dashboard">
            <DashboardMobile />
          </PrivateRoute>

          <PrivateRoute path="/routine">
            <Routine />
          </PrivateRoute>
          <PrivateRoute path="/goal">
            <Goals />
          </PrivateRoute>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
