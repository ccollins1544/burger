/**
 * @subpackage controllers/burgers_controller 
 * @package burger
/* ===============[ Libraries ]========================*/
const path = require('path');
var express = require("express");
var router = express.Router();

// burger model use by the routes
var burger = require(path.resolve(__dirname, "../models/burger.js"));

/* ===============[ Routes ]===========================*/
// Get All Burgers
router.get("/", function(request, response){
  burger.all(function(data){
    var handlebars_object = { burgers: data };
    response.render("index", handlebars_object);
  });
});

// Add New Burger
router.post("/api/burger", function(request, response){
  burger.create(["burger_name"], [request.body.burger_name], function(result){
    response.json({ id: result.insertId });
  });
});

// Update Burger
router.put("/api/burger/:id", function(request, response){
  var condition = { id: request.params.id };

  burger.update(
    {
      devoured: (request.body.devoured) ? 1 : 0
    },
    condition,
    function(result){
      if(result.changedRows === 0 ){
        return response.status(404).end();
      }
      response.status(200).end();
    }
  );
});

module.exports = router;
