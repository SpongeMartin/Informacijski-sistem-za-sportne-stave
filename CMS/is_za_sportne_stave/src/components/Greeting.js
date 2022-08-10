import React, { useState } from 'react'

const Greeting = ({username}) => {
  return (
    <div className='header home-menu pure-menu pure-menu-horizontal'>
        <h1>Welcome {username}</h1>
    </div>
  )
}

export default Greeting