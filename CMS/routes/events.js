const express = require("express")
const DB = require('../DB/dbConn.js')
const sse = require("../sse/sse")
const events = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

events.get("/betStream", sse.init)

events.post("/postBets", jsonParser, async (req,res)=>{
    let title = req.body.title
    let userid = req.body.id
    if (title && userid) {
        try{
            let queryResult = await DB.addBet(userid,title)
            sse.send("JSON.stringify(queryResult)", "bet-post")
            res.send(queryResult)
            console.log("Created bet!")
        }catch(err){
            console.log(err)
            console.log("Error occured!")
            res.sendStatus(500)
        }
    }else{
        console.log("Please fill all fields!")
    }
    res.end()
})

module.exports = events