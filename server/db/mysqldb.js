'use strict';

const mysql = require('mysql');
const Promise = require('bluebird');
const Pool = require('mysql/lib/Pool');
const Connection = require('mysql/lib/Connection');
Promise.promisifyAll([Pool, Connection]);
Promise.longStackTraces();

const options = {
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(options);

module.exports = pool;
