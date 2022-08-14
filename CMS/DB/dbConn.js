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

datapool.allBets=()=>{
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

datapool.assignRole=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO vloga (id) VALUES (?)`,[id], (err,res)=>{
            if (err) {return reject(err)}
            return resolve(res)
        })
    })
}

datapool.connectUsertoRole=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO vloga_uporabnik (id, id_v, id_u) VALUES (?,?,?)`, [id,id,id],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.searchAvailability=(user,mail)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM uporabnik WHERE uporabnisko_ime = ? OR email = ?`,[user,mail],(err,res, fields)=>{
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

datapool.getRole=(id)=>{
    return new Promise ((resolve,reject)=>{
        conn.query('SELECT tip FROM vloga WHERE id = ?',[id],(err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.addBet=(user_id,betname,choices)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO stava (naslov,u_id,izbire) VALUES (?,?,?)`, [betname,user_id,choices],(err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.reportBet=(user_id,bet_id,details,type)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO prijava (besedilo,tip,id_s,id_u) VALUES (?,?,?,?)`, [details,type,bet_id,user_id], (err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.addPlayers=(bet_id,user_id,amount,vamount,choice)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO stavni_listek (id_s,id_u,znesek,v_znesek,izbira) VALUES (?,?,?,?,?)`, [bet_id,user_id,amount,vamount,choice], (err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.updateBet=(amount,vamount,id)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`UPDATE stava SET znesek = znesek + ? , v_znesek= v_znesek + ? WHERE id = ?`, [amount,vamount,id], (err,res,fields)=>{
            if(err){console.log(err)
                return reject(err)}
            return resolve(res)
        })
    })
}


datapool.deleteBet=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`DELETE FROM stava WHERE id = ?`, [id],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.allComments=()=>{
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM komentar`,(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.addComment=(user_id,bet_id,content,username)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO komentar (besedilo, uporabnisko_ime, id_u, id_s) VALUES (?,?,?,?)`,[content,username,user_id,bet_id],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.commentVote=(id,value)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE komentar SET tocke = tocke + ? WHERE id = ?`, [value,id],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.updateUserBalance=(id,amount,vamount,points = 0)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE uporabnik SET denar = denar + ?, vdenar = vdenar + ?, tocke = tocke + ? WHERE id = ?`,[amount,vamount,points,id],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.allWinners=(id,result)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM stavni_listek WHERE id_s = ? AND izbira = ?`, [id,result],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.prizeTokens=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT znesek,v_znesek FROM stava WHERE id = ?`,[id],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.editUser=(username,password,id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE uporabnik SET id = ?, uporabnisko_ime = ?, geslo = ?`,[id,username,password],(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}


module.exports=datapool