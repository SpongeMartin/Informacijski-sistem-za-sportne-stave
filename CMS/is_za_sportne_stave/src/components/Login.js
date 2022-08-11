import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import '../login.css'
import axios from '../api/axios'

const LOGIN_URL = './users/login';
const REGISTER_URL = './users/register';

const Login = ({setUserId,setUsername, setRole, setBalance, setVirtualBalance}) => {
    const { setAuth } = useContext(AuthContext)
    const [signing,setSigning] = useState("Sign-In")
    const userRef = useRef()
    const passRef = useRef()
    const errRef = useRef()
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setErrMsg] = useState("")
    const [email,setEmail] = useState("")
    let navigate = useNavigate();

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

    const handleLogin = async (e) =>{
        e.preventDefault()
        try {
            await axios.post(LOGIN_URL,
                {username: user,password: password},
                { headers: {'Content-Type': 'application/json'}, withCredentials:true }
            ).then(response=>{
                setUsername(response.data.user[0].uporabnisko_ime)
                setBalance(response.data.user[0].denar)
                setVirtualBalance(response.data.user[0].vdenar)
                setRole(response.data.role[0].tip)
                setUserId(response.data.user[0].id)
            });
            setAuth({user,password});
            setUser('')
            setPassword('')
            navigate("/")
        } catch (err) {
            if(!err?.response){
                setErrMsg("No server response");
            } else if(err.response?.status === 400){
                setErrMsg("Missing username or password");
            } else if(err.response?.status === 401){
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current?.focus();
        }
    }

    const handleRegister = async (e) =>{
        e.preventDefault()
        try{
            console.log(user+password+email)
            const response = await axios.post(REGISTER_URL,
                {username: user, password: password, email: email},
                {headers: {"Content-Type": "application/json"}, withCredentials:true }
            );
            console.log(JSON.stringify(response?.data));
            setUser('')
            setPassword('')
            setSigning("Sign-In")
        }catch(err){
            if(!err?.response){
                setErrMsg("No server response");
            }else if(err.response?.status === 400){
                setErrMsg("Missing username or password")
            }else if(err.response?.status === 406){
                setErrMsg("User already exists!")
            }
        }
    }

    useEffect(()=>{
        if(signing === "Sign-In"){
            setForm(
                <>
                    <h2 className='active'> Sign In </h2>
                    <h2 className='inactive underlineHover' onClick={changeSign}>Sign Up </h2>
                    <div className="fadeIn first">
                        <h2 style={{color:"black"}}>Please sign in!</h2>
                        <h2 style={{color:"red", width:"300px", marginTop:"10px"}}> {errMsg} </h2>
                    </div>
                    <form onSubmit={handleLogin}>
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
                    <form onSubmit={handleRegister}>
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
    },[signing,user,password,email,errMsg])

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {form}
            </div>
        </div>
  )
}

export default Login