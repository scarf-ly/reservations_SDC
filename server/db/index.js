const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'munch',
  // password: 'password'
});

connection.connect();

module.exports = connection;
