import React, { useEffect, useState } from 'react'
import AddComment from './AddComment'
import Comment from './Comment'

const CommentSection = ({userId,betId,creatorId,comments,username}) => {
  const [data,setData] = useState(null)
  useEffect(()=>{
    setData(
      <div className='comment-section'>
            {comments?.reverse()?.map((comment) =>(
            <div key={comment?.id}>
                <Comment content={comment?.besedilo} date={comment?.datum} userId={comment?.id_u} username={comment?.uporabnisko_ime}
                betId={betId} creatorId={creatorId} points={comment?.tocke} commentId={comment?.id}/>
            </div>)
            )}
        </div>
    )
  },[comments,betId,userId,username])
  return (
    <>
      {data}
      {userId ? (<div>
          <AddComment username={username} betId={betId} userId={userId}/>
      </div>):<></>}
    </>
  )
}

export default CommentSection