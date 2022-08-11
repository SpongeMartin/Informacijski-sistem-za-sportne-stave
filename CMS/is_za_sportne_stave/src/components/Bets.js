import React from 'react'
import Bet from './Bet'

const Bets = (props) => {
  return (
    <>
      {props.betList?.map((bet) => (
        <div key={bet.id}>
          <Bet title={bet.naslov} date={bet.datum} sum={bet.znesek}/>
        </div>
      ))}
    </>
  )
}

export default Bets