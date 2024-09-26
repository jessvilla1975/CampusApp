const mysql = require('mysql2');

require('dotenv').config();

var connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to Db:', err);  // Muestra detalles del error
    return;
  }
  console.log('Connection established');
});

module.exports = connection;
