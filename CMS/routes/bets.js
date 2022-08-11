const express = require("express")
const DB = require('../DB/dbConn.js')
const bets = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

bets.get('/retrieve', async (req,res)=>{
    try {
        let queryResult = await DB.allBets()
        res.send(queryResult)
    } catch (err) {
        res.sendStatus(500)
    }
})

module.exports = bets