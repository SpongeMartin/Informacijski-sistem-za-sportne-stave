import React, { useState } from 'react'
import Profile from './Profile';
import EditProfile from './EditProfile'
import AddTokens from './AddTokens';

const Greeting = ({username,logged,balance,vbalance,points}) => {
  return (
    <div className='header home-menu pure-menu pure-menu-horizontal'>
        <h1 className='pure-menu-heading' color='white' style={{'marginTop':"0px", 'marginBottom':"0px"}}>Welcome {username}</h1>
        {username ? <><Profile balance={balance} vbalance={vbalance}/>
        <AddTokens/> <EditProfile/></> : <></>}
        {logged}
    </div>
  )
}

export default Greeting