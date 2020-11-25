import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LandingPageScreen from './screens/LandingPageScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateRoutineScreen from './screens/CreateRoutineScreen';
import CreateGoalScreen from './screens/CreateGoalScreen';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => (isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

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
        <PrivateRoute path="/dashboard">
          <DashboardScreen />
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
