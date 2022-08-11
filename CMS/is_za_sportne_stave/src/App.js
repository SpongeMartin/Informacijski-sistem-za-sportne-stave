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
import AddBets from './components/AddBets';
const stream = new EventSource('http://88.200.63.148:5055/betStream',{withCredentials:true})
const GET_BET_URL = './bets/retrieve'

function App() {
  const [username,setUsername] = useState(null)
  const [userId,setUserId] = useState(null)
  const [role,setRole] = useState(null)
  const [balance,setBalance] = useState(null)
  const [virtualBalance,setVirtualBalance] = useState(null)
  const [betList,setBetList] = useState(null)
  const [posted,setPosted] = useState(null)



  useEffect(()=>{
    const fetchData = async() =>{
      try {
        await axios.get(GET_BET_URL).then(
          response=>{
            setBetList(response.data)
        });
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();


    stream.addEventListener('open', () => {
      console.log('SSE opened!');
    });
  
    stream.addEventListener('bet-post', (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);
  
      setBetList(data);
    });
  
    stream.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });

    return () => {
      stream.close();
    };
  }, [posted]);


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Greeting username={username}/>
              <Link to="/login"><div><h3>Login</h3></div></Link>
              <Nav/>
              <Bets betList={betList}/>
              <Profile username={username} role={role} balance={balance} virtualBalance={virtualBalance}/>
              {username ? <AddBets id={userId} setPosted={setPosted} posted={posted}/> : <></>}
            </>
          }/>
          <Route path="/login" element={
            <Login setUserId={setUserId} setUsername={setUsername} setRole={setRole} setBalance={setBalance} setVirtualBalance={setVirtualBalance}/>
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
