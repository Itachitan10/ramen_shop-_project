const express = require('express');
const conn =require('../database/database')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {
    const {email , password} = req.body

    console.log(req.body);
    

    
   if(!email || !password){ 
    res.status(400) .json({mess: 'please check your eamil or your password'})
    
   }else{

    try{
        const sql ='SELECT * FROM register WHERE email = ? '
       const response = await conn(sql , [email]) 
       
       if(!response.length > 0){
         return res.status(401).json({ mess: 'user not found' })
          console.log('user not found');  
       }
      
       const user = response[0]; 
       const ismatch = await bcrypt.compare(password , user.password)
       if(!ismatch){
         res.status(401).json({ mess: 'invalid password' })
       }
       const userid = response[0].id

        const token = jwt.sign(
          {userid : user.id},
          process.env.JWT_SECRET,
          {expiresIn : '1h'}
        )

          res.json({token , email :user.email , name : user.name })
        
       
    }catch(error){ 
        console.log(error)
   return res.status(500).json({ mess: 'server error' })
        
 }


     
   }
    
  
   
});

module.exports = router;