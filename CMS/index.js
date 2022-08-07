const express = require('express')
require('dotenv').config()
const homepage = require('./routes/homepage')
const app = express()
const port = 5055
const mysql = require('mysql2')
const dbConn = require('./DB/dbConn')

app.use('/homepage',homepage)

app.get("/",(req,res)=>{
    res.send("zivjo")
})

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

