const express = require('express')
const routes = express.Router()
const   nodemailer  = require ('nodemailer')
require('dotenv').config();
const crypto = require('crypto')
const conn = require('../database/database');
    


const transporter = nodemailer.createTransport({ 
    service : 'Gmail', 
    auth : { 
        user : process.env.EMAIL_USER, 
        pass : process.env.EMAIL_PASS
    }
})
 
routes.post('/forgot-password' , async (req , res) =>{ 
    const email = req.body ; 


    console.log(email.gmail);
    
    if(!email){ 
        res.status(400).json({mess : 'no email send '})
    }
    const sql ='SELECT * FROM register WHERE email = ? '
      const response = await conn(sql , [email.gmail]) 
           
           if(!response.length > 0){
            console.log('user not found');  
             return res.status(401).json({ mess: 'no exixting gamil' })
              
           }

        
           process.env.CORS || `http://localhost:3000/forgot-gmail`
           
           
           const token = crypto.randomBytes(32).toString('hex')

          
           
           
        //    console.log(token);
           


        //    console.log(`${process.env.CORS || "http://localhost:3000"}/forgot-gmail`)
           
        //    console.log(transporter);
           
           await transporter.sendMail({ 
            from : process.env.USER_EMAIL,
            to : response[0].email, 
            subject: "Reset your password",
             text: `Click this link to reset your password:  ${process.env.CORS || "http://localhost:3000"}/forgot-gmail`,
            
           })
           console.log("EMAIL SENT!");
           
    
})


module.exports =  routes
