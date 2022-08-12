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

datapool.addBet=(user_id,betname)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO stava (naslov,u_id) VALUES (?,?)`, [betname,user_id],(err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.connectUsertoBet=(user_id,bet_id)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO stava_uporabnik (id_s,id_u,tip) VALUES (?,?,?)`,[bet_id,user_id,'Creator'],(err,res,fields)=>{
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

datapool.betOn=(bet_id,user_id,amount,vamount)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`INSERT INTO stava_uporabnik (id_s,id_u,znesek,v_znesek) VALUES (?,?,?,?)`, [bet_id,user_id,amount,vamount], (err,res,fields)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

datapool.updateBet=(amount,vamount,id)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`UPDATE stava SET znesek = ? , v_znesek= ? WHERE id = ?`, [amount,vamount,id], (err,res,fields)=>{
            if(err){console.log(err)
                return reject(err)}
            return resolve(res)
        })
    })
}

datapool.getBetInfo=(id)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(`SELECT znesek,v_znesek FROM stava WHERE id = ?`,[id],(err,res)=>{
            if(err){return reject(err)}
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

module.exports=datapool