import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const EDIT_URL = "./users/edit"

const Edit = ({id}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleChange = (e) =>{
    e.preventDefault()
    navigate("/")
    axios.post(EDIT_URL,{username:username,password:password,id:id},
      { headers: {'Content-Type': 'application/json'}, withCredentials:true })
  }
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className='active'>Your profile</h2>
        <div className="fadeIn first">
          <h2 style={{color:"black"}}>Edit your credentials!</h2>
          <h2 style={{color:"red", width:"300px", marginTop:"10px"}}></h2>
        </div>
        <form onSubmit={handleChange}>
          <input type="text" id="login" className="fadeIn second"
          name="login" placeholder="username" required onChange={(e) => setUsername(e.target.value)} value={username}/>
          <input type="password" id="password" className="fadeIn third"
          name="login" placeholder="password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
          <input type="submit" className="fadeIn fourth" value="Change"/>
        </form>
      </div>
    </div>
  )
}

export default Edit