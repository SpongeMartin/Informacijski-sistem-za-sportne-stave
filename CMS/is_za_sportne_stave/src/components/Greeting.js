import React, { useState } from 'react'

const Greeting = ({username}) => {
  const [logged,setLogged] = useState(false)
  return (
    <div className='header home-menu pure-menu pure-menu-horizontal'>
        <h1>Welcome {logged ? {username} : "guest"}</h1>
    </div>
  )
}

export default Greeting