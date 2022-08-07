const express = require('express')
const app = express()
const mysql = require('mysql2')
let datapool={}

var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: 'SISIII2022_89201258',
})

 conn.connect((err) => {
     console.log('Connecting!')
      if(err){
          return;
      }
      console.log('Connection established');
})

datapool.allSports=()=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`SELECT * FROM stava`, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.addUser=(user,pass,mail)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO uporabnik (uporabnisko_ime,geslo,email) VALUES (?,?,?)`, [user,pass,mail], (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.authorizeUser=(user,pass)=>{
    return new Promise ((resolve,reject)=>{
        conn.query('SELECT * FROM uporabnik WHERE uporabnisko_ime = ? AND geslo = ?', [user,pass], (err,res, fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.addBet=(user_id,betname)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO stava (naslov,u_id) VALUES (?,?)`, [betname,user_id],(err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

module.exports=datapool