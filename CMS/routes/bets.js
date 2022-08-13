const express = require("express")
const DB = require('../DB/dbConn.js')
const bets = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

bets.post("/delete", async (req,res)=>{
    let id = req.body.id
    if(id){
        try {
            await DB.deleteBet(id)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})


bets.post("/post", async (req,res)=>{
    let userId = req.body.id
    let title = req.body.title
    try{
        let queryResult = await DB.addBet(userId,title)
    }catch(err){
        res.sendStatus(500)
    }
})

bets.get('/retrieve', async (req,res)=>{
    try {
        let queryResult = await DB.allBets()
        res.send(queryResult)
    } catch (err) {
        res.sendStatus(500)
    }
})

bets.get('/stream',async(req,res)=>{
    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Cache-Control','no-cache')
    let intervalId = setInterval(async ()=>{
        try {
            let queryResult = await DB.allBets()
            res.status(200).write(`data:${JSON.stringify(queryResult)}\n\n`)
        }catch(err){
            console.log(err)
        }
    },7000)
    res.on('close', () => {
        clearInterval(intervalId)
        res.end()
    })
})

module.exports = bets