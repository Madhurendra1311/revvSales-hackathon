import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import CreateDocument from './components/CreateDocument';
import Form from './components/Form';


function App() {
  return (
    <div>
      <BrowserRouter>    
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/createdocument" component={CreateDocument} />
        <Route path="/form" component={Form} />
      </BrowserRouter>
    </div>
  );
}

export default App;