const express = require('express')
require('dotenv').config()
const users = require('./routes/users')
const bets = require('./routes/bets')
const comments = require('./routes/comments')
const reports = require('./routes/reports')
const players = require('./routes/players')
const app = express()
const port = 5055
const mysql = require('mysql2')
const dbConn = require('./DB/dbConn')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require("path")


app.use(express.static('is_za_sportne_stave/build'))
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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'is_za_sportne_stave/build'))
});

app.use("/users",users)
app.use("/comments",comments)
app.use('/bets',bets)
app.use("/players",players)
app.use("/reports",reports)


app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

