const express = require('express')
const routes = express.Router()
const jwt =require('jsonwebtoken')
const conn = require('../database/database')


const  verifytoken  =(req , res , next ) =>{ 
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



routes.post('/cart_insert_item', verifytoken , async(req ,res , next)=>{ 
  
  
  try{ 
    
    const user_Id = req.id
  const body = req.body
  const { product_name,description, price, category,image_url , quantity } = body

      if(!user_Id ||!product_name || !description ||  !price || !category || !image_url || !quantity){ 
        return  res.status(400).json({ mess: "data is undefined" });
      }
      const sql  = 'INSERT INTO user_cart(product_name, description, price ,category,userid, image_url , quantity ) VALUES(? ,? , ?  ,? , ? , ? ,? )'
      const value = [product_name,description, price , category , user_Id,image_url , quantity]
      const response = await conn(sql,value)
              
        if (response.affectedRows === 0) {
          return res.status(400).json({
            mess: "Failed to add cart"
          });
        }
        
        return res.status(201).json({
          mess: "Cart added successfully"
        });

        
    }catch(error){ 
        return res.status(401).json({
          mess: "token is invalid"
        });
    }

})

routes.get('/cart_item', verifytoken,async (req, res) => {
  try { 
  const user_id = req.id

  console.log(user_id);
  
  
  if(!user_id){ 
    return res.status(401).json({ 
      mess : 'user not authenticated'
    })
  }
  const sql = 'SELECT *FROM user_cart WHERE userid =? '
    const value = user_id
    const response = await conn(sql ,value)
    if (response.length === 0) {
      return res.status(404).json({
        mess: "No cart items found"
      });
    }

    const item  = response.map(items => ({ 
    product_id: items.product_id,
    product_name: items.product_name,
    description:  items.description,
    price:  items.price ,
    category: items.category,
    image_url: items.image_url,
    quantity : items.quantity
    }))
    
    res.send(item)


}catch(error) { 
  console.log(error);

    return res.status(500).json({
      mess: "Server error"
    })
}
  
});


module.exports = routes
