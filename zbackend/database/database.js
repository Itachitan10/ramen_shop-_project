const mysql = require('mysql2')
const express = require('express')
const router = express.Router()

const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ramen_db',
    port: process.env.DB_PORT || 3306
})

conn.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message)
        return
    }

    console.log('Database connected!')
})


module.exports = (query, value = []) => {
    return new Promise((resolve, reject) => {
        conn.query(query, value, (err, result) => {
            if (err) {
                return reject(err)
            }

            resolve(result)
        })
    })
}

