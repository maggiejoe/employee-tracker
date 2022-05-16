const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MaggiesSQL1107!',
        database: 'employees'
    },
    console.log("connected to the employees database")
);

module.exports = connection;