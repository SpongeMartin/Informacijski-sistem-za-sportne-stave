import React, { useEffect, useState } from 'react'
import Bet from './Bet'

const Bets = (props) => {
  const [bet, setbet] = useState(null)
  useEffect(()=>{
    setbet(props.betList?.map((bet) => (
      <div className='l-box pure-u-1 pure-u-md-1-2 bet-border' key={bet.id}>
        <Bet title={bet.naslov} date={bet.datum} sum={bet.znesek} vsum={bet.v_znesek} balance={props.balance} vbalance={props.vbalance}
         userId={props.userId} id={bet.id} creatorId={bet.u_id} username={props.username}
         commentList={props.commentList?.map((comment)=> comment.id_s === bet.id ? comment : void(0))}/>
      </div>
    )))
  },[props.commentList,props.betList,props.role])
  return (
    <div className='content pure-g'>
      {bet}
    </div>
  )
}

export default Bets