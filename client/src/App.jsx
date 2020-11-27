import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/navbar/Navbar';

import Dashboard from './components/dashboard/Dashboard';
import Snackbar from "./components/snackbar/Snackbar";
import Goals from "./components/goals/Goals";
import Routine from "./components/routine/Routine";
import DashboardMobile from "./components/dashboard/mobile/DashboardMobile";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Snackbar />
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

export default App;
