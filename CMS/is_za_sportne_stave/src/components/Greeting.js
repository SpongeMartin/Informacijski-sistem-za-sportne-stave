import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import EditProfile from './EditProfile'
import AddTokens from './AddTokens';
import { Link } from 'react-router-dom';

const Greeting = ({username,logged,balance,vbalance,points,setUser,setRole}) => {
  const [login,setLogin] = useState(null)
  useEffect(()=>{
    const setOffline = () =>{
      setUser(null); 
      setRole("Not logged in")
    }
    if(!logged) setLogin(<Link to="/login"><h3 className='pure-menu-link align-right'>Login</h3></Link>)
    else setLogin(
      <><Profile balance={balance} vbalance={vbalance} points={points}/>
        <AddTokens/> <EditProfile/>
    <h3 className='pure-menu-link' style={{'display':'inline-block'}} onClick={setOffline}>Log out</h3></>)
  },[logged,balance,vbalance,points,username])

  return (
    <div className='header home-menu pure-menu pure-menu-horizontal'>
        <h1 className='pure-menu-heading' color='white' style={{'marginTop':"0px", 'marginBottom':"0px"}}>Welcome {username}</h1>
        {login}
    </div>
  )
}

export default Greeting