import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../login.css'


const Login = () => {
    const [signing,setSigning] = useState("Sign-In")
    const userRef = useRef()
    const passRef = useRef()
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setErrMsg] = useState("")
    const [email,setEmail] = useState("")
    useEffect(()=>{
        userRef.current?.focus();
    },[])
    useEffect(()=>{
        setErrMsg('');
    },[user,password])
    
    const changeSign = () => {
        signing === "Sign-In" ? setSigning("Sign-Up") : setSigning("Sign-In")
        setUser("")
        setPassword("")
    }

    const [form,setForm] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }

    useEffect(()=>{
        if(signing === "Sign-In"){
            setForm(
                <>
                    <h2 className='active'> Sign In </h2>
                    <h2 className='inactive underlineHover' onClick={changeSign}>Sign Up </h2>
                    <div className="fadeIn first">
                        <h2 style={{color:"black"}}>Please sign in!</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="login" className="fadeIn second" ref={userRef}
                        name="login" placeholder="username" required onChange={(e) => setUser(e.target.value)} value={user}/>
                        <input type="password" id="password" className="fadeIn third" ref={passRef}
                         name="login" placeholder="password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </>)
        }else{
            setForm(
                <>
                    <h2 className='inactive underlineHover' onClick={changeSign}> Sign In </h2>
                    <h2 className='active'>Sign Up </h2>
                    <div className="fadeIn first">
                        <h2 style={{color:"black"}}>Please sign up!</h2>
                    </div>
                    <form>
                        <input type="text" id="email" className='fadeIn second' name='login' placeholder='email' required value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="username" required value={user}
                        onChange={(e) => setUser(e.target.value)}/>
                        <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" required
                        onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input type="submit" className="fadeIn first" value="Register"/>
                    </form>
                </>)
        }
    },[signing,user,password,email])

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {form}
            </div>
        </div>
  )
}

export default Login