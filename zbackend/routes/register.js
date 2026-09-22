const express= require('express')
const router = express.Router();
const conn = require('../database/database')
const bcrypt = require('bcrypt');




router.post('/register' , async(req , res)=>{ 

    
   const {first_name , last_name , email, mobile_number , password} = req.body

   const hashedpassword = await bcrypt.hash(password , 10)

   const sql  = 'INSERT INTO register(first_name , last_name , email, mobile , password) VALUE(? ,? , ?  ,? , ? )'

   
   try{ 
   const  values = [first_name , last_name , email, mobile_number , hashedpassword]
   const response = await conn(sql, values)
   console.log('succes');
   
   res.status(200).json({mess :' registration success'})
   
   }catch(err){ 
     console.log('this is the error on line 19',err);

     
        res.status(500).json({
            message: 'Registration failed'
        });

   }
});




module.exports = router;