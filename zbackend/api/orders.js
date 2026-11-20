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

    const { full_name,   mobile_number, address, city,postal_code,delivery_option, payment_method, items  } = req.body;
    const userId = req.id;
    

    
    // delivery_option
    if (!full_name || !mobile_number ||  !address ||!city ||!postal_code || !delivery_option ||!payment_method ||!Array.isArray(items) ||items.length === 0) {
    return res.status(400).json({
        success: false,
        message: 'Please complete all checkout information.'
    });
      }

  
      
      const validDeliveryOptions = ['Standard delivery', 'Express delivery'];
      const validPaymentMethods = ['Cash on Delivery', 'GCash','Credit or Debit Card']; 
      if (typeof delivery_option !== 'string' || !validDeliveryOptions.includes(delivery_option))
        return res.status(400).json({
        success: false,
        message: 'Invalid payment option'
       });   
       
        if (typeof payment_method !== 'string' || !validPaymentMethods.includes(payment_method) ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment method.'
            });
        }
          for (const product of items) {
              const product_id = Number(product.product_id);
              const quantity = Number(product.quantity);

              if (!product_id || !quantity || quantity <= 0) {
                  return res.status(400).json({
                      success: false,
                      message: 'Invalid product ID or quantity.'
                  });
              }
          }
              let subtotal = 0;
              const orderItems = [];
                  for (const product of items) {

                    const result = await conn( 'SELECT product_id, price FROM products WHERE product_id = ?',  [product.product_id]);
                    if (result.length === 0) {
                        return res.status(404).json({
                            success: false,
                            message: 'Product not found.'
                        });
                    }

                    const price = Number(result[0].price);
                    const quantity = Number(product.quantity);

                    subtotal += price * quantity;

                    orderItems.push({ product_id: product.product_id, quantity: quantity,price  : price});

                    
                    
                }
                console.log(orderItems);
                

           
                  
         
    
});










module.exports = routes