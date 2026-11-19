const express = require('express'); 
const router = express.Router();
const BASE_URL = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`
const conn = require('../database/database')
router.get('/products', async (req, res) => {

    const products = await conn(
        `SELECT * FROM products`
    );

    console.log(products);

    res.send(products);

});

module.exports = router

