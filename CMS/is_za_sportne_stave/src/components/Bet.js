import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

const REPORT_URL = "/bets/report"
const BET_URL = "/bets/bet"
const DELETE_URL = "/bets/delete"

const Bet = ({id,title,date,sum,userId,creatorId}) => {
    const [betAmount, setbetAmount] = useState('')
    const [vbetAmount, setvbetAmount] = useState('')
    const [betView, setbetView] = useState('betting')
    const [type,setType] = useState('drugo')
    const [form,setForm] = useState(null)
    const [reportText,setReportText] = useState('')

    const betSum = (amount) =>{
        if (amount<0) setbetAmount('')
        else setbetAmount(amount)
    }

    const vbetSum = (amount) =>{
        if (amount<0) setvbetAmount('')
        else setvbetAmount(amount)
    }

    const handleSubmitBet = async (e) =>{
        e.preventDefault()
        await axios.post(BET_URL,
            {id:userId,betId:id,amount:betAmount,vamount:vbetAmount},
            {headers: {'Content-Type': 'application/json'}, withCredentials:true }
        );
        setbetAmount('')
        setvbetAmount('')
    }
    
    const handleSubmitReport = async (e) =>{
        e.preventDefault()
        await axios.post(REPORT_URL,
            {id:userId,details:reportText,betId:id,type:type},
            {headers: {'Content-Type': 'application/json'}, withCredentials:true }
        );
        setbetView("betting")
        setReportText("")
        setType("other")
    }

    const changeBetView = () =>{
        if(betView === "betting") setbetView("reporting")
        else setbetView("betting")
    }

    const handleFinalize = async() =>{
        await axios.post(DELETE_URL,
            {id:id},
            {headers: {'Content-Type':'application/json'}, withCredentials:true}
        );
    }

    useEffect(()=>{
        if (betView === "betting") {
            setForm(
                <div className='bet'>
                    <h2>{title}</h2>
                    <p>Begin: {date}</p>
                    {(userId && !(creatorId===userId)) ? <button onClick={changeBetView}>Report!</button> : <></>}
                    <p>Current total funds: {sum}</p>
                    {userId ? <form onSubmit={handleSubmitBet}>
                        <input type="number" id="betAmount"
                            name="betAmount" placeholder="Bet Amount" required onChange={(e) => betSum(e.target.value)} value={betAmount}/>
                        <input type="number" id="vbetAmount"
                            name="vbetAmount" placeholder="Virtual Bet Amount" required onChange={(e) => vbetSum(e.target.value)} value={vbetAmount}/>
                        <input type="submit" value="Place bet"/>
                    </form> : <></>}
                    {creatorId===userId ? <button onClick={handleFinalize}>Finalize!</button> :  <></>}
                </div>
            );
        }else{
            setForm(
                <div className='bet'>
                    <h2>{title}</h2>
                    <button onClick={changeBetView}>Back</button>
                    <form onSubmit={handleSubmitReport}>
                        <input type="text" id="report" name='report' placeholder='Please provide information' 
                        required value={reportText} onChange={(e) => setReportText(e.target.value)}/>
                        <select onChange={(e) => setType(e.target.value)} name="reportType" id="reportType">
                            <option value="drugo">Other</option>
                            <option value="napacna_opredelitev">False evaluation</option>
                            <option value="ne_obstaja">Non-existent competition</option>
                            <option value="se_ni_zakljucila">Competition ended</option>
                        </select>
                        <input type="submit" value="Report"/>
                    </form>
                </div>
            );
        }
    },[betView,reportText,betAmount,vbetAmount])


  return (
    <>{form}</>
  )
}

export default Bet