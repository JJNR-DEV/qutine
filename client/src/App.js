import './App.css';
import React from 'react';
import LandingPage from './components/landingPage/LandingPage'
import Dashboard from './components/dashboard/Dashboard'
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Routine from "./components/routine/Routine"

const App = () => {
  return (
    <div className="App">
      <Routine />
    </div>
  );
}

export default App;
