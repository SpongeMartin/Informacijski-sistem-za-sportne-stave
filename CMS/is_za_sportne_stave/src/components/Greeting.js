import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import EditProfile from './EditProfile'
import AddTokens from './AddTokens';

const Greeting = ({username,logged,balance,vbalance,points}) => {
  const [point,setPoint] = useState(0)
  
  useEffect(()=>{
    setPoint(points)
  },[points])

  return (
    <div className='header home-menu pure-menu pure-menu-horizontal'>
        <h1 className='pure-menu-heading' color='white' style={{'marginTop':"0px", 'marginBottom':"0px"}}>Welcome {username}</h1>
        {username ? <><Profile balance={balance} vbalance={vbalance} points={points}/>
        <AddTokens/> <EditProfile/></> : <></>}
        {logged}
    </div>
  )
}

export default Greeting