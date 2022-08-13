import React from 'react'
import { Link } from 'react-router-dom'

const EditProfile = () => {
  return (
    <div className='edit-profile'>
        <Link to="/profile" style={{'color':'white'}}>Edit Profile</Link>
    </div>
  )
}

export default EditProfile