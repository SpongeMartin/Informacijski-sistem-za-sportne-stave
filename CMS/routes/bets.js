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

bets.post("/bet", async (req,res)=>{
    let userId = req.body.id
    let amount = parseInt(req.body.amount)
    let betId = req.body.betId
    let vamount = parseInt(req.body.vamount)
    if (userId && amount && betId && vamount) {
        try {
            let queryResult = await DB.getBetInfo(betId)
            await DB.betOn(betId,userId,amount,vamount)
            amount += parseInt(queryResult[0].znesek)
            vamount += parseInt(queryResult[0].v_znesek)
            await DB.updateBet(amount,vamount,betId)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})

bets.post("/report", async (req,res)=>{
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

bets.post("/post", async (req,res)=>{
    let userId = req.body.id
    let title = req.body.title
    try{
        let queryResult = await DB.addBet(userId,title)
        await DB.connectUsertoBet(userId,queryResult.insertId)
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