import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import LandingPageScreen from './screens/landingPageScreen';
import DashboardScreen from './screens/dashboardScreen';
import CreateRoutineScreen from './screens/createRoutineScreen';
import CreateGoalScreen from './screens/createGoalScreen';

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/register">
          <RegisterScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/dashboard">
          <DashboardScreen />
        </Route>
        <Route path="/routine">
          <CreateRoutineScreen />
        </Route>
        <Route path="/goal">
          <CreateGoalScreen />
        </Route>
        <Route path="/">
          <LandingPageScreen />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
