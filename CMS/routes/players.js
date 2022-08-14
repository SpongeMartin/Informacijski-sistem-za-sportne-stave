const express = require("express")
const DB = require('../DB/dbConn.js')
const players = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

players.post("/bet", async (req,res)=>{
    let userId = req.body.id
    let amount = parseInt(req.body.amount)
    let betId = req.body.betId
    let vamount = parseInt(req.body.vamount)
    let choice = req.body.choice
    if (userId && betId && (vamount || amount) && choice) {
        try {
            await DB.addPlayers(betId,userId,amount,vamount,choice)
            await DB.updateBet(amount,vamount,betId)
            await DB.updateUserBalance(userId,-amount,-vamount)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})

module.exports = players