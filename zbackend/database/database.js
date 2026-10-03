const mysql = require('mysql2')
const express = require('express')
const router = express.Router()
const mysql = require('mysql2');

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000
});

conn.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }

    console.log('Database connected!');
    connection.release();
});

module.exports = (query, values = []) => {
    return new Promise((resolve, reject) => {
        conn.query(query, values, (err, result) => {
            if (err) {
                console.error('Database query error:', err.message);
                return reject(err);
            }

            resolve(result);
        });
    });
};
