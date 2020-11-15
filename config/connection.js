/**
 * @subpackage connection 
 * @package burger
/* ===============[ Libraries ]========================*/
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
var dbconf = require("./dbconf.js");
var mysql = require("mysql2");

/* ===============[ Connection ]========================*/
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection(dbconf.credentials);
}

module.exports = connection;
