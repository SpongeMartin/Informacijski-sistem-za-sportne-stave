import React from 'react'
import OngoingBets from './OngoingBets'

const Profile = ({balance,vbalance,points}) => {
  return (
    <div className='user-details'>
        <p className='user-balance'>Tokens: {balance} V-Tokens: {vbalance} Points: {points}</p>
    </div>
  )
}

export default Profile