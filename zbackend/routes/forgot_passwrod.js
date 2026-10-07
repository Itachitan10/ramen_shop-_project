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
             const resetLink = process.env.CORS
             console.log(resetLink);
                 await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: response[0].email,
                        subject: "Reset your Kumo Ramen Password",
                         html: `
                            <div style="margin:0;padding:30px 15px;background:#F7F1E5;font-family:Arial,sans-serif;color:#2B2118">

                            <div style="max-width:380px;margin:auto;background:#FFFDF7;border:2px solid #2B2118;padding:24px;box-shadow:4px 4px 0 #2B2118">

                                <div style="margin-bottom:20px">
                                <span style="font-size:22px">🍜</span>
                                <b style="margin-left:8px;font-size:14px;letter-spacing:2px">KUMO</b>
                                <small style="display:block;margin-left:31px;color:#D62828;font-weight:bold;letter-spacing:2px">
                                    RAMEN SHOP
                                </small>
                                </div>

                                <h2 style="margin:0;font-size:21px">Reset your password</h2>

                                <p style="margin:8px 0 18px;color:#6F6256;font-size:13px;line-height:1.5">
                                We received a request to reset your Kumo Ramen password.
                                </p>

                                <a
                                href="${resetLink}"
                                style="display:block;padding:11px;background:#D62828;border:2px solid #2B2118;color:white;text-align:center;text-decoration:none;font-weight:bold;font-size:13px;box-shadow:2px 2px 0 #2B2118"
                                >
                                Reset password
                                </a>

                                <p style="margin:18px 0 0;color:#8A7B6B;font-size:11px;line-height:1.5">
                                This link expires in 15 minutes.<br>
                                If you didn't request this, simply ignore this email.
                                </p>

                            </div>

                            <p style="text-align:center;color:#8A7B6B;font-size:10px;margin-top:16px">
                                Kumo Ramen · Account Security 🍜
                            </p>

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
