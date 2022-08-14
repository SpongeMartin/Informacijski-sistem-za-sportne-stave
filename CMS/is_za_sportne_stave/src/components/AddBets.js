import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
const POST_URL = './bets/post'

const AddBets = ({id,setPosted,posted}) => {
    const [title,setTitle] = useState("")
    const [choices,setChoices] = useState(null)
    const [addChoices,setAddChoices] = useState('')
    
    const handlePostBet = async (e) => {
        e.preventDefault()
        if (choices) {
            let choiceString = choices.toString()
            setChoices(null)
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
    <div>
        <form onSubmit={handlePostBet}>
            <h3>Title: </h3>
            <input type="text" id="title" name="title" placeholder="title" required
            onChange={(e) => setTitle(e.target.value)} value={title}/>
            <h3>Choices: </h3>
            <ul>
                {choices?.map((item)=><li>{item}</li>)}
            </ul>
            <input type="text" id="addChoice" name="addChoice" placeholder="Add a Choice"
            onChange={(e) => setAddChoices(e.target.value)} value={addChoices}/>
            <button type="button" onClick={newChoice}>Add choice</button>
            <input type="submit" value="Post"/>
        </form>

    </div>
  )
}

export default AddBets