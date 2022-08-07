import React from 'react'

const Bets = (props) => {
  return (
    <div className='bets'>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <button className='betButton' onClick={props.bet}>Place bet</button>
    </div>
  )
}

export default Bets