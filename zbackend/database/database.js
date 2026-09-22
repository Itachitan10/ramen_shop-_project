const mysql = require('mysql2')
const express =require('express')
const router = express.Router()



const conn = mysql.createConnection({ 
    host : 'localhost', 
    user : 'root' ,
    password  : '', 
    database : 'ramen_db',
    port :  3306
})




 module.exports = (query ,value = [])=>{ 
    return new Promise((resolve , reject)=>{ 
        conn.query(query , value , (err , result)=>{
            if(err){
              return reject(err)
             }
             resolve(result)
        })

    })

}






