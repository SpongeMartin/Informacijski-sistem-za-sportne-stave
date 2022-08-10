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
import axios from "./api/axios";

function App() {
  const [username,setUsername] = useState(null)
  const [role,setRole] = useState(null)
  const [balance,setBalance] = useState(null)
  const [virtualBalance,setVirtualBalance] = useState(null)

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Greeting username={username}/>
              <Link to="/login"><div><h3>Login</h3></div></Link>
              <Nav/>
              <Bets/>
              <Profile username={username} role={role} balance={balance} virtualBalance={virtualBalance}/>
            </>
          }/>
          <Route path="/login" element={
            <Login setUsername={setUsername} setRole={setRole} setBalance={setBalance} setVirtualBalance={setVirtualBalance}/>
          }/>
          <Route path="/news" element={
            <>

            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
