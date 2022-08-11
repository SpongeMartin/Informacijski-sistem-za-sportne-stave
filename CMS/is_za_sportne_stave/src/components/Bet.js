import React from 'react'

const Bet = ({title,date,sum}) => {
    const bet = () =>{
        console.log("ricknrolledlol")
    }
  return (
    <div className='bet'>
    <h2>{title}</h2>
    <p>{date}</p>
    <p>{sum}</p>
    <button className='betButton' onClick={bet}>Place bet</button>
</div>
  )
}

export default Bet