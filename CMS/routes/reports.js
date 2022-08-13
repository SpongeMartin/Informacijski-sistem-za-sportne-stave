const express = require("express")
const DB = require('../DB/dbConn.js')
const reports = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

reports.post("/report", async (req,res)=>{
    let userId = req.body.id
    let details = req.body.details
    let betId = req.body.betId
    let type = req.body.type
    if (userId && details && betId && type) {
        try {
            await DB.reportBet(userId,betId,details,type)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})

module.exports = reports