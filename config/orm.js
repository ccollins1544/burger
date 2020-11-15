/**
 * @subpackage orm 
 * @package burger
/* ===============[ Libraries ]========================*/
const path = require('path');
var connection = require(path.resolve(__dirname, "./connection.js"));
// var PrettyTable = require("cli-table2");
var colors = require("colors");

/**
 * orm 
 * Connects to mysql database and has all the CRUD functions (Create, Read, Update, Delete)
 * for manipulating the database.
 */
var orm = {
  //===========================[ CREATE ]===========================================
  insertOne: function (table, cols, vals, cb = this.loopObject) {
    var queryString = "INSERT INTO " + table + " (";
    queryString += cols.toString();
    queryString += ") VALUES (";
    queryString += this.printQuestionMarks(vals.length);
    queryString += ");";

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  create: function (table, cols, vals, cb = this.loopObject) {
    var queryString = "INSERT INTO " + table + " (";
    queryString += cols.toString();
    queryString += ") VALUES (";
    queryString += this.printQuestionMarks(vals.length);
    queryString += ");";

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  //===========================[ READ ]=============================================
  query: function (sql) {
    if (sql === undefined) return; // GTFO

    connection.query(sql, function (error, results, fields) {
      if (error) throw error;

      console.log("\r\n\r\n" + sql.yellow);
      console.log(results.length.toString().cyan + " affected rows!".cyan);
      console.log("_".repeat(sql.length).white);

      var top_row = [];
      var rows = [];

      for (var i = 0; i < results.length; i++) {
        var cells = [];

        for (var property in results[i]) {
          if (results[i].hasOwnProperty(property)) {
            if (top_row === undefined || top_row.length < Object.keys(results[i]).length) {
              top_row.push(property.red);
            }
            cells.push(results[i][property].toString().green);
          }
        }

        rows.push(cells);
      }

      // var Table = new PrettyTable({
      //   head: top_row,
      // });

      var Table = [];

      for (var r = 0; r < rows.length; r++) {
        Table.push(rows[r]);
      }

      // console.log(Table.toString());
      console.log(Table);
    });
  },

  // Query multiple records
  querySelect: function (sql, callback = this.loopArrayObject) {
    if (sql === undefined) return; // GTFO
    var results_arr = [];

    connection.query(sql, function (error, results) {
      if (error) throw error;

      console.log("\r\n\r\n" + sql.yellow);
      console.log("Selected ".cyan + results.length.toString().cyan + " number of rows.".cyan);
      console.log("_".repeat(sql.length).white);

      for (var i = 0; i < results.length; i++) {
        var row = [];
        for (var property in results[i]) {
          if (results[i].hasOwnProperty(property)) {
            row[property] = results[i][property];
          }
        }
        results_arr.push(row);
      }

      return callback(results_arr);
    });
  },

  // Query a single record
  querySingleRec: function (sql, callback = this.loopObject) {
    if (sql === undefined) return; // GTFO

    connection.query(sql, function (error, results) {
      if (error) throw error;

      console.log("\r\n\r\n" + sql.yellow);
      console.log("Selected ".cyan + results.length.toString().cyan + " number of rows.".cyan);
      console.log("_".repeat(sql.length).white);

      for (var i = 0; i < results.length; i++) {
        var row = [];
        for (var property in results[i]) {
          if (results[i].hasOwnProperty(property)) {
            row[property] = results[i][property];
          }
        }

        return callback(row);
      }
    });
  },

  selectAll: function (table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  //===========================[ UPDATE ]===========================================
  updateOne: function (table, fieldsKeyVal, whereKeyVal, cb = this.loopObject) {
    var queryString = "UPDATE " + table + " SET ? WHERE ?";
    var query = connection.query(queryString, [fieldsKeyVal, whereKeyVal], function (err, result) {
      if (err) throw err;
      cb(result);
    });

    console.log("\r\n\r\n" + query.sql.yellow);
  },

  updateFields: function (table, fieldsKeyVal, whereKeyVal, cb = this.loopObject) {
    var queryString = "UPDATE " + table + " SET ? WHERE ?";
    var query = connection.query(queryString, [fieldsKeyVal, whereKeyVal], function (err, result) {
      if (err) throw err;
      cb(result);
    });

    console.log("\r\n\r\n" + query.sql.yellow);
  },

  //===========================[ DELETE ]===========================================
  delete: function (table, whereKeyVal, cb = this.loopObject) {
    if (typeof (whereKeyVal) != 'object') return; // GTFO

    var queryString = "DELETE FROM " + table + " WHERE ?"
    var query = this.connection.query(queryString, whereKeyVal, function (error, results) {
      if (error) throw error;
      cb(results);
    });

    console.log("\r\n\r\n" + query.sql.yellow);
  },

  //===========================[ Helpers ]=================================
  printQuestionMarks: function (num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  },

  // Loop through an array of objects
  loopArrayObject: function (resultsArray) {
    var top_row = [];
    var rows = [];

    for (var i = 0; i < resultsArray.length; i++) {
      var cells = [];

      for (var property in resultsArray[i]) {
        if (resultsArray[i].hasOwnProperty(property)) {
          if (top_row === undefined || top_row.length < Object.keys(resultsArray[i]).length) {
            top_row.push(property.red);
          }
          cells.push(resultsArray[i][property].toString().green);
        }
      }

      rows.push(cells);
    }

    // var Table = new PrettyTable({
    //   head: top_row,
    // });

    var Table = [];

    for (var r = 0; r < rows.length; r++) {
      Table.push(rows[r]);
    }

    // console.log(Table.toString());
    console.log(Table);
  },

  // Loop through an object
  loopObject: function (resultsObject) {
    var top_row = [];
    var rows = [];
    var cells = [];

    for (var property in resultsObject) {

      if (resultsObject.hasOwnProperty(property)) {
        if (top_row === undefined || top_row.length < Object.keys(resultsObject).length) {
          top_row.push(property.red);
        }
        cells.push(resultsObject[property].toString().green);
      }
    }

    rows.push(cells);

    // var Table = new PrettyTable({
    //   head: top_row,
    // });

    var Table = [];

    for (var r = 0; r < rows.length; r++) {
      Table.push(rows[r]);
    }

    // console.log(Table.toString());
    console.log(Table);
    return;
  },

  // Just return the results
  returnResults: function (data) {
    return data;
  },

  // Do nothing function is just used as a dummy callback.
  emptyFunction: function (data) {
    return;
  },

};

module.exports = orm;
