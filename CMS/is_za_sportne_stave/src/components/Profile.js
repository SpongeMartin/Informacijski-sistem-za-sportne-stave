import React from 'react'
import OngoingBets from './OngoingBets'

const Profile = ({username,balance}) => {
  return (
    <div>
        <h3>{username}</h3>
        <p>{balance}</p>
        <OngoingBets/>
    </div>
  )
}

export default Profile