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

const GET_BET_URL = './bets/retrieve'

function App() {
  const [user,setUser] = useState(null)
  const [role,setRole] = useState("Not logged in")
  const [betList,setBetList] = useState(null)
  const [logged,setLogged] = useState(null)

  useEffect(()=>{
    const stream = new EventSource('http://88.200.63.148:5055/bets/stream',{withCredentials:true})

    stream.addEventListener('open', () => {
      console.log('SSE opened!');
    });
  
    stream.addEventListener('message', (e) => {
      setBetList(JSON.parse(e.data));
      console.log(betList)
    });
  
    stream.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });
  
    return () => {
      stream.close();
    };
  });

  useEffect(()=>{
        const fetchData = async() =>{
      try {
        await axios.get(GET_BET_URL).then(response=>{
            if (betList) setBetList(betList + response.data)
            else setBetList(response.data)
        });
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  },[])

  useEffect(()=>{
    if(!user) setLogged(<Link to="/login"><div><h3>Login</h3></div></Link>)
    else setLogged(<div onClick={()=>setUser(null)}><h3>Log out</h3></div>)
  },[user])

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Greeting username={user?.uporabnisko_ime}/>
              {logged}
              <Nav/>
              <Bets betList={betList} userId={user?.id}/>
              <Profile username={user?.uporabnisko_ime} role={role} balance={user?.denar} virtualBalance={user?.vdenar}/>
              {(role === "Moderator" || role === "Admin") ? <AddBets id={user.id}/> : <></>}
            </>
          }/>
          <Route path="/login" element={
            <Login user={user} setUser={setUser} setRole={setRole} />
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
