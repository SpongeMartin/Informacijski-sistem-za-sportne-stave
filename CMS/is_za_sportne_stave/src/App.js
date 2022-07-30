//import './App.css';
import 'purecss/build/pure.css'
import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"
import Nav from './components/Nav';
import Greeting from './components/Greeting';
import Login from './components/Login';
import Profile from './components/Profile';
import Bets from './components/Bets';

function App() {
  //const location = useLocation()
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Greeting/>
              <Link to="/login"><div><h3>Login</h3></div></Link>
              <Nav/>
              <Bets/>
              <Profile/>
            </>
          }/>
          <Route path="/login" element={
            <Login/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
