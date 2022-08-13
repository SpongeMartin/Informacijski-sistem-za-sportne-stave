import React from 'react'
import { Link } from 'react-router-dom'

const AddTokens = () => {
  return (
    <div className='edit-profile'><Link to="/purchase" style={{'color':'gold'}}>Add Tokens</Link></div>
  )
}

export default AddTokens