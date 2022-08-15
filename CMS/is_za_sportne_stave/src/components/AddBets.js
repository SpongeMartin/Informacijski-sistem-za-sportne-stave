import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
const POST_URL = './bets/post'

const AddBets = ({id,setPosted,posted}) => {
    const [title,setTitle] = useState("")
    const [choices,setChoices] = useState(null)
    const [addChoices,setAddChoices] = useState('')
    
    const handlePostBet = async (e) => {
        e.preventDefault()
        if (choices.length>=2) {
            let choiceString = choices.toString()
            setChoices(null)
            setTitle('')
            try{
                await axios.post(POST_URL,
                    {title:title, id:id, choices:choiceString},
                    {headers: {"Content-Type": "application/json"}, withCredentials:true }
                );
                setTitle('')
            }catch(err){
                console.log(err)
            }
        }else{
            console.log("Please enter in some choices!")
        }
        
    }

    const newChoice = () =>{
        if (choices===null) {
            setChoices([addChoices])
        }else {
            let array = choices
            array.push(addChoices)
            setChoices(array)
        }
        setAddChoices('')
    }



  return (
    <div className='create-bet-box'>
        <form onSubmit={handlePostBet}>
            <h3 className='create-bet-text'>Title: </h3>
            <input type="text" id="title" name="title" placeholder="title" required
            onChange={(e) => setTitle(e.target.value)} value={title}/>
            <h3 className='create-bet-text' style={{'marginTop':'10px'}}>Choices: </h3>
            <ul style={{'margin':'0px 0px'}}>
                {choices?.map((item,index)=><li key={index} className='create-bet-items'>{item}</li>)}
            </ul>
            <input type="text" id="addChoice" name="addChoice" placeholder="Add a Choice" style={{'width':'60%'}}
            onChange={(e) => setAddChoices(e.target.value)} value={addChoices} autoComplete="off"/>
            <button className='create-bet-button' type="button" onClick={newChoice}>Add choice</button>
            <div style={{'textAlign':'center'}}><input className='create-bet-button' type="submit" value="Post"/></div>
        </form>

    </div>
  )
}

export default AddBets