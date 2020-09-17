import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import LandingPage from './components/LandingPage'
import Home from './components/Home';


function App() {
  return (
    <div>
      <BrowserRouter>    
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;