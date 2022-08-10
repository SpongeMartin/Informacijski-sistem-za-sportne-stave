const express = require("express")
const users = express.Router();
const session = require("express-session")
const DB = require('../DB/dbConn.js')
const bodyParser = require('body-parser');
const { send } = require("process");
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


users.get('/login',async(req,res,next)=>{
    console.log("Session: " + JSON.stringify(req.session))
    if(req.session.user) {
        res.send({
            logged:true,
            user:req.session.user,
            role:req.session.role
        })
    }
    else{
        res.send({logged:false})
    }
})


users.post('/login',jsonParser, async (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    if(username && password){
        try{
            let queryResult = await DB.authorizeUser(username,password)
            if(queryResult.length>0){
                if(password===queryResult[0].geslo){
                    req.session.user=queryResult
                    req.session.save()
                    let roleResult = await DB.getRole(queryResult[0].id)
                    req.session.role = roleResult
                    req.session.save()
                    res.send(req.session)
                    console.log("Valid session")
                }else{
                    console.log("Incorrect password")
                }
            }else{
                console.log("User not registred")
                res.sendStatus(401)
            }
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("Please enter Username and Password" + username)
        res.sendStatus(401)
    }
    res.end()
})

users.post('/register', jsonParser, async (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    if(username && password && email){
        try{
            let queryResult = await DB.searchAvailability(username,email)
            if (!queryResult.length>0) {
                queryResult = await DB.addUser(username,password,email)
                await DB.assignRole(queryResult.insertId)
                await DB.connectUsertoRole(queryResult.insertId)
                if(queryResult.affectedRows){
                    console.log("New user added!")
                }
            }else{
                res.sendStatus(406)
            }
            
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing")
    }
    res.end()
})

module.exports=users