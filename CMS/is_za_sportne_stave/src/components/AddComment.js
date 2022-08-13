import React, { useState } from 'react'
import axios from '../api/axios'
const COMMENTING_URL = "./comments/add"

const AddComment = ({userId,betId,username}) => {
    const [commentText, setcommentText] = useState("")
    const handleComment = async(e) =>{
        e.preventDefault()
        setcommentText('')
        try{
            await axios.post(COMMENTING_URL,
                {userId:userId, betId:betId, content:commentText, username:username},
                {headers: {'Content-Type': 'application/json'}, withCredentials:true }
            );
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <form onSubmit={handleComment} autoComplete="off">
                <div>
                    <input type="text" style={{'width':'55%','display':'inline-block'}} name="addComment" placeholder="Write something!"
                    required onChange={(e) => setcommentText(e.target.value)} value={commentText}/>
                    <input type="submit" value="Post comment"/>
                </div>
            </form>
        </div>
    )
}

export default AddComment