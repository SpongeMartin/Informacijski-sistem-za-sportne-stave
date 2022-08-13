import React from 'react'

const Edit = () => {
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className='active'> Sign In </h2>
        <h2 className='inactive underlineHover'>Sign Up </h2>
        <div className="fadeIn first">
          <h2 style={{color:"black"}}>Please sign in!</h2>
          <h2 style={{color:"red", width:"300px", marginTop:"10px"}}></h2>
        </div>
        <form>
          <input type="text" id="login" className="fadeIn second"
          name="login" placeholder="username" required/>
          <input type="password" id="password" className="fadeIn third"
          name="login" placeholder="password" required/>
          <input type="submit" className="fadeIn fourth" value="Log In"/>
        </form>
        <div id="formFooter">
          <a className="underlineHover" href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  )
}

export default Edit