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
                 const htmldesign = `
                <!DOCTYPE html>
                <html lang="en">
                <body style="margin:0;padding:0;background:#F7F1E5;">

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F1E5;">
                    <tr>
                    <td align="center" style="padding:30px 15px;">

                        <table width="380" cellpadding="0" cellspacing="0"
                        style="width:100%;max-width:380px;background:#FFFDF7;border:1px solid #E8DDC8;border-radius:10px;">

                        <tr>
                            <td style="padding:24px;font-family:Arial;color:#2B2118;">

                            <p style="margin:0;font-size:15px;font-weight:bold;letter-spacing:2px;">
                                🍜 KUMO
                            </p>

                            <p style="margin:2px 0 18px 30px;font-size:10px;font-weight:bold;letter-spacing:2px;color:#D62828;">
                                RAMEN SHOP
                            </p>

                            <h2 style="margin:0;font-size:20px;">
                                Reset your password
                            </h2>

                            <p style="margin:7px 0 18px;font-size:14px;line-height:1.5;color:#6F6256;">
                                Enter a new password for your Kumo Ramen account.
                            </p>

                            <a href="${resetLink}/forgot-gmail"
                                style="display:block;padding:13px;background:#D62828;color:#FFFFFF;text-align:center;text-decoration:none;border-radius:6px;font-weight:bold;">
                                Reset Password
                            </a>

                            <p style="margin:16px 0 0;font-size:12px;color:#8A7B6B;">
                                This link will expire after 15 minutes.
                            </p>

                            <p style="margin:6px 0 0;font-size:12px;color:#8A7B6B;">
                                If you didn't request this, you can ignore this email.
                            </p>

                            </td>
                        </tr>

                        </table>

                    </td>
                    </tr>
                </table>

                </body>
                </html>
        `;

        
             console.log(resetLink);
                 await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: response[0].email,
                        subject: "Reset your Kumo Ramen Password",
                        html : htmldesign    
                        
                    });
           console.log("EMAIL SENT!");
           

           console.log(resetLink);
           
    
})


// forger password and sent to data base with gmail and token
routes.post('/forgot-password2' , async (req , res) =>{
    console.log(req.body);
     

})

module.exports =  routes
