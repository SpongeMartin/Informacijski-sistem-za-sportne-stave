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
  const [commentList,setCommentList] = useState(null)
  const [logged,setLogged] = useState(null)

  useEffect(()=>{
    const betStream = new EventSource('http://88.200.63.148:5055/bets/stream',{withCredentials:true})

    betStream.addEventListener('open', () => {
      console.log('SSE opened!');
    });
  
    betStream.addEventListener('message', (e) => {
      setBetList(JSON.parse(e.data));
      console.log(betList)
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
            else setBetList(response.data)
        });
        await axios.get(GET_COMMENTS_URL).then(response=>{
          if (commentList) setCommentList(commentList + response.data)
          else setCommentList(response.data)
        });
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  },[])

  useEffect(()=>{
    const setOffline = () =>{
      setUser(null); 
      setRole("Not logged in")
    }
    if(!user) setLogged(<Link to="/login"><h3 className='pure-menu-link align-right'>Login</h3></Link>)
    else setLogged(<h3 className='pure-menu-link' style={{'display':'inline-block'}} onClick={setOffline}>Log out</h3>)
  },[user])

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Greeting username={user?.uporabnisko_ime} logged={logged} balance={user?.denar} vbalance={user?.vdenar} points={user?.tocke} />
              <Bets role={role} betList={betList} username={user?.uporabnisko_ime} userId={user?.id} commentList={commentList} balance={user?.denar} vbalance={user?.vdenar}/>
              {(role === "Moderator" || role === "Admin") ? <AddBets id={user.id}/> : <></>}
            </>
          }/>
          <Route path="/login" element={
            <Login user={user} setUser={setUser} setRole={setRole} />
          }/>
          <Route path="/profile" element={
            <Edit/>
          }/>
          <Route path="/purchase" element={
            <TokenPurchase/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
