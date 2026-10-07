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
 
// forget password send email
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
             const resetLink = `${process.env.CORS || "http://localhost:3000"}/forgot-gmail?token=${token}`;
             

             console.log(resetLink);
             
                 await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: response[0].email,
                        subject: "Reset your Kumo Ramen Password",

                        html: `
                            <div style="font-family:Arial,sans-serif;background:#f7f1e5;padding:30px;text-align:center">
                                <div style="max-width:450px;margin:auto;background:white;padding:30px;border-radius:12px">
                                    
                                    <h1 style="color:#d62828">🍜 Kumo Ramen</h1>
                                    <h2 style="color:#2b2118">Reset Your Password</h2>

                                    <p style="color:#666">
                                        We received a request to reset your password.
                                    </p>

                                    <a href="${resetLink}"
                                    style="display:inline-block;padding:12px 24px;background:#d62828;color:white;text-decoration:none;border-radius:7px;font-weight:bold">
                                        Reset Password
                                    </a>

                                    <p style="color:#999;font-size:12px;margin-top:20px">
                                        This link will expire after 15 minutes.
                                    </p>

                                    <p style="color:#aaa;font-size:11px">
                                        If you didn't request this, you can ignore this email.
                                    </p>

                                </div>
                            </div>
                        `
                    });
           console.log("EMAIL SENT!");
           

           console.log(resetLink);
           
    
})


// forger password and sent to data base with gmail and token
routes.post('/forgot-password2' , async (req , res) =>{
    console.log(req.body);
     

})

module.exports =  routes
