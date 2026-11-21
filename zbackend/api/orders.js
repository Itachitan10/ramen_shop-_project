const express = require('express')
const routes = express.Router()
const jwt =require('jsonwebtoken')
const conn = require('../database/database')
const  createCheckoutSession = require("../api/paymongo")

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
  try{ 

    const userId = req.id;
    const  registerd_user = await conn( 'SELECT id FROM register WHERE id = ?',[userId]);

if (registerd_user.length === 0) {
    return res.status(401).json({
        success: false,
        message: 'Invalid user token.'
    });
  }
    
    const { full_name,   mobile_number, address, city,postal_code,delivery_option, payment_method, items  } = req.body;

    

    
    // delivery_option
    if (!full_name || !mobile_number ||  !address ||!city ||!postal_code || !delivery_option ||!payment_method ||!Array.isArray(items) ||items.length === 0) {
    return res.status(400).json({
        success: false,
        message: 'Please complete all checkout information.'
    });
      }


      
      const validDeliveryOptions = ['Standard delivery', 'Express delivery'];
      const validPaymentMethods = ['Cash on Delivery', 'GCash']; 
      if (typeof delivery_option !== 'string' || !validDeliveryOptions.includes(delivery_option))
        return res.status(400).json({
        success: false,
        message: 'Invalid delivery option'
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
              let subtotal   = 0;
              const orderItems = []
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

                    subtotal += price * quantity

                     orderItems.push({
                        product_id: product.product_id,
                        quantity: quantity,
                        price: price
                    });
                }
            
              // Itinatakda ang delivery fee depende sa napiling delivery option
                const delivery_fee = delivery_option === 'Standard delivery' ? 49 : 99;

                    // Tinutukoy kung Standard o Express delivery ang pinili ng customer
           
                // Paunang status ng bayad (hindi pa bayad)
                const payment_status = 'Unpaid';

                // Paunang status ng order (naghihintay pa ng pagproseso)
                const order_status = 'Pending';

                // Kinukuha ang kabuuang halaga ng products at delivery fee
                const total_amount = subtotal + delivery_fee;

            const orderResult = await conn(
                `INSERT INTO orders (  user_id,
                    full_name,  mobile_number,   address,
                    city,postal_code,
                    delivery_option, delivery_fee,
                    payment_method, subtotal,
                    total_amount,
                    order_status,  payment_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ 
                   userId,  full_name, mobile_number,  address,  city, postal_code, 
                   delivery_option,delivery_fee,payment_method, subtotal,
                    total_amount,order_status, payment_status
                   ] );

    
                    const orderId = orderResult.insertId;

                    if (!orderId || !total_amount) {
                        return res.status(400).json({
                            success: false,
                            message: 'Failed to create order.'
                        });
                    }
                    // Online payment  
                    if (payment_method === 'GCash') {
                            const amount = Math.round(Number(total_amount) * 100);
                            const checkoutSession = await createCheckoutSession(amount, orderId);

                            return res.status(201).json({
                                success: true,
                                orderId,
                                checkoutUrl: checkoutSession.attributes.checkout_url
                            });
                        }

                        // Cash on Delivery
                        return res.status(201).json({
                            success: true,
                            message: 'Order placed successfully.',
                            orderId
                        });
                                
                    
            } catch (error) {
            console.error("Order error:", error);
            return res.status(500).json({
              success: false,
              message: "Something went wrong while placing your order."
            });
             }
    
           
             
         
  
});










module.exports = routes








