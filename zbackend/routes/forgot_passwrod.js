const express = require('express')
const routes = express.Router()
require('dotenv').config();
const crypto = require('crypto')
const conn = require('../database/database');
const { Resend } = require('resend');
const e = require('express');
const bcrypt = require('bcrypt');

// forget password send email
routes.post('/forgot-password' , async (req , res) =>{ 
    try{ 
         const {email} = req.body ; 
const resend = new Resend(process.env.RESEND_API_KEY)
    if(!email){ 
         return res.status(400).json({mess : 'no email send '})
    }
    const sql ='SELECT * FROM register WHERE email = ? '
      const response = await conn(sql , [email]) 
           console.log(response);

           if(response.length === 0){

        console.log('user not found');  
             return res.status(401).json({ mess: 'no exixting gamil' })
              
        }   
           const token = crypto.randomBytes(32).toString('hex')
           

           const expiresMinutes = 5;
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + expiresMinutes);


            const result = await conn( "UPDATE register SET reset_token = ?, reset_token_expires = ? WHERE email = ? ;",[token, expires, email] );
           const resetLink = `${process.env.CORS || "http://localhost:3000"}/forgot-gmail?token=${token}`;        

        //    console.log(process.env.RESEND_API_KEY)
        //    console.log(resetLink);
           
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

                            <a href="${resetLink}"
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
                  console.log(result);
                  
       
           const {  data ,error } = await resend.emails.send({
            from : `onboarding@resend.dev`, 
            to : response[0].email, 
            subject : 'Reset Your Kumo Ramen password', 
            html : htmldesign,
           })

             if (new Date(tokenExpires) < new Date()) {
                    await conn(`
                        UPDATE register
                        SET reset_token = NULL,
                            reset_token_expires = NULL
                        WHERE reset_token = ?
                    `, [token]);

                    return res.status(400).json({
                        message: "Reset link has expired. Please request a new one."
                    });
                }
      if (error) {
            console.log('Resend error:', error);

            return res.status(500).json({
                mess: 'Failed to send email'
            });
        }

        return res.status(200).json({
            mess: 'Reset email sent successfully'
        });
    
    }catch(error){ 
         console.error('Forgot password error:', error);

        return res.status(500).json({
            mess: 'Server error'
        });
    }
   
})


// forger password and sent to data base with gmail and token


// RESET PASSWORD
routes.post('/forgot-password2', async (req, res) => {

    try {

        console.log(req.body);

        const { token, newPassword } = req.body;
        // Check if token and password were sent
        if (!token || !newPassword) {
            return res.status(400).json({
                mess: 'Token and new password are required'
            });
        }
        // Find token AND check if it is still valid
        const response = await conn(
            `SELECT id FROM register WHERE reset_token = ? AND reset_token_expires > NOW()`,[token]);
        // Token does not exist OR already expired
        if (response.length === 0) {
            return res.status(400).json({
                mess: 'Invalid or expired token'
            });

        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);

    
        const result = await conn(
            `UPDATE register
             SET password = ?,
                 reset_token = NULL,
                 reset_token_expires = NULL
             WHERE id = ?`,
            [hashedPassword, response[0].id]
        );


        console.log('Password update:', result);


        return res.status(200).json({
            mess: 'Password reset successfully'
        });


    } catch (error) {

        console.error('Reset password error:', error);
        return res.status(500).json({
            mess: 'Server error'
        });

    }

});




module.exports =  routes



