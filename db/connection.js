const mysql = require('mysql2')

// Connect to a database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Yayaily!?38',
        database: "business_data"
    }
)

module.exports = db