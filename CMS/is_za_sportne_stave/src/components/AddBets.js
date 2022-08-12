import React, { useState } from 'react'
import axios from '../api/axios'
const POST_URL = './bets/post'

const AddBets = ({id,setPosted,posted}) => {
    const [title,setTitle] = useState("")
    
    const postBet = async (e) => {
        e.preventDefault()
        try{
            await axios.post(POST_URL,
                {title:title, id:id},
                {headers: {"Content-Type": "application/json"}, withCredentials:true }
            );
            setTitle('')
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div>
        <form onSubmit={postBet}>
            <h3>Title: </h3>
            <input type="text" id="title" name="title" placeholder="title" required
            onChange={(e) => setTitle(e.target.value)} value={title}/>
            <input type="submit" value="Post"/>
        </form>

    </div>
  )
}

export default AddBets