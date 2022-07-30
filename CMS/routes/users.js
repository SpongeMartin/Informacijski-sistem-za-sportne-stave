const express = require("express")
const users = express.Router();
const DB = require('../DB/dbConn.js')

users.post('/login', async (req,res)=>{
    var username = req.body.username
    var password = req.body.password
    if(username && password){
        try{
            let queryResult = await DB.authorizeUser(username,password)
            if(queryResult.length>0){
                if(password===queryResult[0].geslo){
                    req.session.user=queryResult
                    console.log(req.session.user)
                    console.log(queryResult)
                    console.log("valid session")

                }else{
                    console.log("Incorrect password")
                }
            }else{
                console.log("User not registred")
            }
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("Please enter Username and Password")
    }
    res.end()
})

users.post('/register', async (res,req)=>{
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    if(username && password && email){
        try{
            let queryResult = await DB.addUser(username,password,email)
            if(queryResult.affectedRows){
                console.log("New user added!")
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