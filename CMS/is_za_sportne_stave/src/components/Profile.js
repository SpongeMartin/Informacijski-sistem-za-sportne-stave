import React, { useEffect, useState } from 'react'

const Profile = ({balance,vbalance,points}) => {
  const [data,setData] = useState(null)
  useEffect(()=>{
    setData(<p className='user-balance'>Tokens: {balance} V-Tokens: {vbalance} Points: {points}</p>)
  },[balance,vbalance,points])
  return (
    <div className='user-details'>
        {data}
    </div>
  )
}

export default Profile