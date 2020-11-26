import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LandingPageScreen from './screens/LandingPageScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateRoutineScreen from './screens/CreateRoutineScreen';
import CreateGoalScreen from './screens/CreateGoalScreen';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/navbar/Navbar';

import Dashboard from './components/dashboard/modile/Dashboard';
import Snackbar from "./components/snackbar/Snackbar";

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Snackbar />
      <Switch>
        <Route path="/register">
          <RegisterScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <PrivateRoute path="/dashboard">
          <DashboardScreen />
        </PrivateRoute>

        <PrivateRoute path="/mobile-dashboard">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute path="/routine">
          <CreateRoutineScreen />
        </PrivateRoute>
        <PrivateRoute path="/goal">
          <CreateGoalScreen />
        </PrivateRoute>
        <Route path="/">
          <LandingPageScreen />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
