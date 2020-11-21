const mysql = require('mysql2/promise')
const dbConnection = require('./dbconfig.json')
const pool = mysql.createPool(dbConnection)

module.exports = pool