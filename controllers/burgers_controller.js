/**
 * @subpackage controllers/burgers_controller 
 * @package burger
/* ===============[ Libraries ]========================*/
var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

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
  var condition = "id = " + request.params.id;
  burger.update(
    {
      devoured: request.body.devoured
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