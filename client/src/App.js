import './App.css';
import React from 'react';
import LandingPage from './components/landingPage/LandingPage'
import Dashboard from './components/dashboard/Dashboard'
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Goals from './goals/Goals';

const App = () => {
  return (
    <div className="App">
      <Goals />
    </div>
  );
}

export default App;
