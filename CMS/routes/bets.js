const express = require("express")
const DB = require('../DB/dbConn.js')
const bets = express.Router()
const bodyParser = require('body-parser')
const { allComments } = require("../DB/dbConn.js")
var jsonParser = bodyParser.json()

bets.post("/delete", async (req,res)=>{
    let id = req.body.id
    let result = req.body.result
    if(id && result){
        try {
            let queryAllTokens = await DB.prizeTokens(id)
            let queryWinners = await DB.allWinners(id,result)
            let userArray = []
            let winningVTokens = 0
            let winningTokens = 0
            let allTokensArray = []
            const setArrayAndWinningTokens = (item) => {
                allTokensArray.push([item.znesek,item.v_znesek])
                winningTokens += item.znesek
                winningVTokens += item.v_znesek
                userArray.push(item.id_u)
            }
            queryWinners.map(setArrayAndWinningTokens)
            let loserVTokens = queryAllTokens[0].v_znesek - winningVTokens
            let loserTokens = queryAllTokens[0].znesek - winningTokens
            
            allTokensArray.forEach( async function(item,index){
                let tokens = Math.floor(item[0]/winningTokens*loserTokens+item[0])
                let vTokens = Math.floor(item[1]/winningVTokens*loserVTokens+item[1])
                let points = tokens*2 + vTokens
                await DB.updateUserBalance(userArray[index],tokens,vTokens,points)
            })
            await DB.deleteBet(id)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})


bets.post("/post", async (req,res)=>{
    let userId = req.body.id
    let title = req.body.title
    let choices = req.body.choices
    try{
        let queryResult = await DB.addBet(userId,title,choices)
    }catch(err){
        res.sendStatus(500)
    }
})

bets.get('/retrieve', async (req,res)=>{
    try {
        let queryResult = await DB.allBets()
        let queryComments = await DB.allComments()
        queryResult.forEach((item)=>{
            item.comments=[]
            for (let i = 0; i < queryComments.length; i++) {
                if(item.id===queryComments[i].id_s) item.comments.push(queryComments[i])
            }
        })
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
            let queryBets = await DB.allBets()
            let queryComments = await DB.allComments()
            queryBets.forEach((item)=>{
                item.comments=[]
                for (let i = 0; i < queryComments.length; i++) {
                    if(item.id===queryComments[i].id_s) item.comments.push(queryComments[i])
                }
            })
            res.status(200).write(`data:${JSON.stringify(queryBets)}\n\n`)
        }catch(err){
            console.log(err)
        }
    },5000)
    res.on('close', () => {
        clearInterval(intervalId)
        res.end()
    })
})

module.exports = bets