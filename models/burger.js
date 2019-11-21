/**
 * @subpackage model/burger 
 * @package burger
/* ===============[ Libraries ]========================*/
var orm = require("../config/orm.js");

/**
 * burger
 * model that specifically uses the burger table with the ORM. 
 */
var burger = {
  all: function(cb){
    orm.selectAll("burgers", function(res){
      cb(res);
    });
  },
  create: function(cols, vals, cb){
    orm.insertOne("burgers", cols, vals, function(res){
      cb(res);
    });
  },
  update: function(fieldsKeyVal, whereKeyVal, cb){
    orm.updateOne("burgers", fieldsKeyVal, whereKeyVal, function(res){
      cb(res);
    });
  }
}

module.exports = burger;