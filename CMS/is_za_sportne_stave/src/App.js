import './App.css';
import 'purecss/build/pure.css'
import 'purecss/build/grids-responsive-min.css'
import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"
import Greeting from './components/Greeting';
import Login from './components/Login';
import Bets from './components/Bets';
import axios from "./api/axios";
import AddBets from './components/AddBets';
import Edit from './components/Edit';
import TokenPurchase from './components/TokenPurchase';

const GET_BETS_URL = './bets/retrieve'
const GET_COMMENTS_URL = './comments/retrieve'

function App() {
  const [user,setUser] = useState(null)
  const [role,setRole] = useState("Not logged in")
  const [betList,setBetList] = useState(null)

  useEffect(()=>{
    const betStream = new EventSource('http://88.200.63.148:5055/bets/stream',{withCredentials:true})

    betStream.addEventListener('open', () => {
    });
  
    betStream.addEventListener('message', (e) => {
      let data = JSON.parse(e.data)
      setBetList(data)
    });
  
    betStream.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });
  
    return () => {
      betStream.close();
    };
  });

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        await axios.get(GET_BETS_URL).then(response=>{
            if (betList) setBetList(betList + response.data)
            else{
              setBetList(response.data)
            } 
        }).catch(err=>{
          console.log(err)
        });
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  },[])



  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Greeting username={user?.uporabnisko_ime} setUser={setUser} setRole={setRole} logged={user} balance={user?.denar} vbalance={user?.vdenar} points={user?.tocke} />
              {(role === "Moderator" || role === "Admin") ? <AddBets id={user.id}/> : <></>}
              <Bets role={role} betList={betList} username={user?.uporabnisko_ime} userId={user?.id} balance={user?.denar} vbalance={user?.vdenar}/>
              
            </>
          }/>
          <Route path="/login" element={
            <Login user={user} setUser={setUser} setRole={setRole} />
          }/>
          <Route path="/profile" element={
            <Edit id={user?.id}/>
          }/>
          <Route path="/purchase" element={
            <TokenPurchase id={user?.id}/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
