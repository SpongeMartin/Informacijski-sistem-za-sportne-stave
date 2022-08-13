const express = require("express")
const DB = require('../DB/dbConn.js')
const comments = express.Router()
const bodyParser = require('body-parser')
const { response } = require("express")
var jsonParser = bodyParser.json()

comments.post('/vote',async(req,res)=>{
    let id = req.body.id
    let vote = parseInt(req.body.vote)
    if (id && vote) {
        try {
            await DB.commentVote(id,vote)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})

comments.get('/retrieve',async(req,res)=>{
    try {
        let queryResult = await DB.allComments()
        res.send(queryResult)
    } catch (err) {
        res.sendStatus(500)
    }
})

comments.post('/add',async(req,res)=>{
    let userId = req.body.userId
    let betId = req.body.betId
    let content = req.body.content
    let username = req.body.username
    if (userId && betId && content) {
        try {
            await DB.addComment(userId,betId,content,username)
        } catch (err) {
            res.sendStatus(500)
        }
    }
})

comments.get('/stream',async(req,res)=>{
    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Cache-Control','no-cache')
    let intervalId = setInterval(async ()=>{
        try {
            let queryResult = await DB.allComments()
            res.status(200).write(`data:${JSON.stringify(queryResult)}\n\n`)
        }catch(err){
            console.log(err)
        }
    },5000)
    res.on('close', () => {
        clearInterval(intervalId)
        res.end()
    })
})

module.exports = comments