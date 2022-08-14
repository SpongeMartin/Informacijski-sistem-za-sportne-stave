import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import CommentSection from './CommentSection'
import { ReactComponent as Megaphone } from '../assets/megaphone.svg';

const REPORT_URL = "/reports/report"
const PLAY_URL = "/players/bet"
const DELETE_URL = "/bets/delete"

const Bet = ({id,title,date,sum,vsum,userId,creatorId,commentList,username,balance,vbalance,betChoices}) => {
    const [betAmount, setbetAmount] = useState('')
    const [vbetAmount, setvbetAmount] = useState('')
    const [betView, setbetView] = useState('betting')
    const [type,setType] = useState('drugo')
    const [form,setForm] = useState(null)
    const [reportText,setReportText] = useState('')
    const [decision,setDecision] = useState(null)
    const [choices,setChoices] = useState(null)
    const [result,setResult] = useState(null)

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
        setbetAmount('')
        setvbetAmount('')
        if (balance>=betAmount && vbalance>=vbetAmount) {
            try{
                await axios.post(PLAY_URL,
                    {id:userId,betId:id,amount:betAmount,vamount:vbetAmount, choice:decision},
                    {headers: {'Content-Type': 'application/json'}, withCredentials:true }
                );
            }catch(err){
                console.log(err)
            }
        }
    }
    
    const handleSubmitReport = async (e) =>{
        e.preventDefault()
        setbetView("betting")
        setReportText("")
        setType("other")
        try {
            await axios.post(REPORT_URL,
                {id:userId,details:reportText,betId:id,type:type},
                {headers: {'Content-Type': 'application/json'}, withCredentials:true }
            );
        } catch (err) {
            console.log(err)
        }
    }

    const changeBetView = () =>{
        if(betView === "betting") setbetView("reporting")
        else setbetView("betting")
    }

    const handleFinalize = async() =>{
        console.log("hallo?")
        try {
            await axios.post(DELETE_URL,
                {id:id,result:result},
                {headers: {'Content-Type':'application/json'}, withCredentials:true}
            );
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        let array = betChoices?.split(",")
        setChoices(array)
    },[betChoices])


    useEffect(()=>{
        if (betView === "betting") {
            setForm(
                <div className='bet' style={{'overflow':"auto"}}>
                    <h2 className='betTitle'>{title}</h2>
                    {(userId && !(creatorId===userId)) ? <div className='report-div align-right' style={{"float":"right"}}><button onClick={changeBetView} style={{'margin':'0px'}}><svg className='svg'><Megaphone/></svg></button></div> : <></>}
                    {creatorId===userId ? <>
                        <h2 style={{"display":"inline-block"}}>Result: </h2>
                        <select onChange={(e)=> setResult(e.target.value)}>
                            <option selected="selected"></option>
                            {choices?.map((choice,index)=><option key={index} value={choice}>{choice}</option>)}
                        </select>
                        <button onClick={handleFinalize}>Finalize!</button></> :  <></>}
                    <span className='betText'>Begin: {date}</span>
                    <span className='betText'>Current total funds: {sum} Current vfunds: {vsum}</span>
                    {userId ? <form onSubmit={handleSubmitBet} autoComplete='off'>
                        <input type="number" id="betAmount"
                            name="betAmount" placeholder="Bet Amount" required onChange={(e) => betSum(e.target.value)} value={betAmount}/>
                        <input type="number" id="vbetAmount"
                            name="vbetAmount" placeholder="Virtual Bet Amount" required onChange={(e) => vbetSum(e.target.value)} value={vbetAmount}/>
                        <div className='align-right'>
                            <select defaultValue="" onChange={(e) => setDecision(e.target.value)} style={{'marginRight':'100px'}}>
                                <option value=""></option>
                                {choices?.map((choice,index)=><option key={index} value={choice}>{choice}</option>)}
                            </select>
                            <input id="bet-button" type="submit" value="Place bet"/>
                        </div>
                    </form> : <></>}
                    <CommentSection username={username} comments={commentList} userId={userId} betId={id} creatorId={id}/>
                </div>
            );
        }else{
            setForm(
                <div className='bet'>
                    <h2>{title}</h2>
                    <button onClick={changeBetView}>Back</button>
                    <form onSubmit={handleSubmitReport} autoComplete='off'>
                        <input type="text" id="report" name='report' placeholder='Please provide information' 
                        required value={reportText} onChange={(e) => setReportText(e.target.value)}/>
                        <select defaultValue="drugo" onChange={(e) => setType(e.target.value)} name="reportType" id="reportType">
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
    },[betView,reportText,betAmount,vbetAmount,type,sum,vsum,choices,commentList])

  return (
    <>{form}</>
  )
}

export default Bet