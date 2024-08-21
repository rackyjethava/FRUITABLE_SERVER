
// const mysql =require("mysql2/promise")

// const pool = mysql.createPool({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   database: 'prectical',
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, 
//   idleTimeout: 60000, 
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// });

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'localhost',
  port: 8111,
  user: 'root',
  password: '',
  database: 'prectical',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool