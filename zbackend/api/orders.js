const express = require('express')
const routes = express.Router()
const jwt =require('jsonwebtoken')
const conn = require('../database/database')


const  verifytoken  = (req , res , next ) =>{ 
  try{
    const token = req.headers.authorization?.split(" ")[1];
    const decoded =jwt.verify(token , process.env.JWT_SECRET)
    req.id = decoded.userid
     next()
  }catch(error){ 
   console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      mess: "Invalid token"
    });

  }

}






routes.post('/orders', verifytoken,  async (req, res) => {

    const { full_name,   mobile_number,    address, city,postal_code,delivery_option, payment_method,items  } = req.body;
    const userId = req.id;
    
    console.log(items[0].product_id);
    
    

    
  

});










module.exports = routes