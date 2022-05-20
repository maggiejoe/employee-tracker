const mysql = require('mysql2');
require('dotenv').config();


// when changing the password to match the env file, causes an error
// need to fix this with BCS before submission
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