'use strict';

const mysql = require('mysql2');

const options = {
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(options);
const promisePool = pool.promise();

module.exports = promisePool;
