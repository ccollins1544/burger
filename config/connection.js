/**
 * @subpackage connection 
 * @package burger
/* ===============[ Libraries ]========================*/
require("dotenv").config();
var dbconf = require("./dbconf.js");
var mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection(dbconf.credentials);
}

module.exports = connection;