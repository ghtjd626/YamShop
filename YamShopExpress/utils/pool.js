const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'mysql.bomandyam.shop',
    port: 3306,
    user: 'admin',
    password: 'asdf1234',
    database: 'BomYamShop',
    connectionLimit: 10
})

module.exports = pool