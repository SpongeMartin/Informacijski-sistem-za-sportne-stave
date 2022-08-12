const express = require('express')
require('dotenv').config()
const homepage = require('./routes/homepage')
const users = require('./routes/users')
const bets = require('./routes/bets')
const app = express()
const port = 5055
const mysql = require('mysql2')
const dbConn = require('./DB/dbConn')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const session = require("express-session")

app.use(express.static('client-dev/build'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin:["http://88.200.63.148:3055"],
  methods:["GET", "POST"],
  credentials:true
}))
app.use(cookieParser("somesecret"))
app.use(session({
    secret:"somesecret",
    resave:true,
    saveUninitialized:true,
    cookie:{expires:60*2}
}))

app.use('/homepage',homepage)
app.use("/users",users)
app.use('/bets',bets)

app.get("/",(req,res)=>{
    res.send("zivjo")
})

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

