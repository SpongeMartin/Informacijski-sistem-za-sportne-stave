const express = require("express")
const homepage = express.Router();
const DB = require('../DB/dbConn.js')


homepage.get('/', async (req,res,next)=>{
    try{
        var queryResult = await DB.allBets();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

homepage.post('/', async (req,res,next)=>{
    let title = req.body.title
    let slug = req.body.slug
    let text = req.body.text
    var allComponents = title && slug && text
    if(allComponents){
        try{
            var queryResult = await DB.addBet(title,slug,text)
            if (queryResult.affectedRows){
                console.log("cool new bet")
            }
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("Fill all fields")
    }
    res.end()
})

module.exports=homepage // for allowing other classes to call methods