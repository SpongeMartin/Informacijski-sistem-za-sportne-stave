import React, { useEffect, useState } from 'react'
import { ReactComponent as ThumbsUp } from '../assets/thumbs-up.svg';
import { ReactComponent as ThumbsDown } from '../assets/thumbs-down.svg';
import axios from '../api/axios';

const VOTE_URL = "/comments/vote"

const Comment = ({content, date, userId, betId, creatorId, points,username,commentId}) => {
    const [vote, setvote] = useState(0)
    const upvote = async () =>{
        if(vote<1){
            console.log("change")
            setvote(1)
            try {
                await axios.post(VOTE_URL,
                    {vote:1,id:commentId},
                    {headers: {'Content-Type': 'application/json'}, withCredentials:true }
                );
            } catch (err) {
                console.log(err)
            }
        }
    }
    const downvote = async () =>{
        if(vote>-1){
            setvote(-1)
            try {
                await axios.post(VOTE_URL,
                    {vote:-1,id:commentId},
                    {headers: {'Content-Type': 'application/json'}, withCredentials:true }
                );
            } catch (err) {
                console.log(err)
            }
        }
    }

  return (
    <div>
        <div>
            <p className='comment-info'>{username}   {date}   {points} </p>
            {username ? (<><ThumbsUp onClick={upvote} style={{'margin':'2px 0px 0px 20px','cursor':'pointer'}} />
                        <ThumbsDown onClick={downvote} style={{'margin':'2px 10px 0px 10px','cursor':'pointer'}} /></>):<></>}
        </div>
        <p className='comment-content'>{content}</p>
    </div>
  )
}

export default Comment