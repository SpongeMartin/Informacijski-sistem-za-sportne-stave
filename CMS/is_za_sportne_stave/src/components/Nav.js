import React from 'react'
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div className='navigation'>
        <Link to="/"><h2>Home</h2></Link>
        <Link to="/news"><h2>News</h2></Link>
        <Link to="leaderboard"><h2>Leaderboard</h2></Link>
    </div>
  )
}

export default Nav