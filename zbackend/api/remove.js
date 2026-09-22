const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')





const verfyJWT =( req , res , next) =>{
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


routes.delete("/delete", verfyJWT, async (req, res) => {
  try {
    const userId = req.id;
    const { id } = req.body;

    if (!Array.isArray(id) || id.length === 0) {
      return res.status(400).json({
        message: "No IDs provided",
      });
    }

    const sql = `DELETE FROM user_cart WHERE product_id IN (?)AND userid = ?`;

    const [result] = await db.query(sql, [id, userId]);

    res.json({
      message: "Cart items deleted successfully",
      deleted: result.affectedRows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = routes