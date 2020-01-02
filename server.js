/**
 * @package burger
 * @subpackage server
 * @author Christopher Collins
 * @version 1.1.1
 * @license none (public domain)
/* ===============[ Dependencies  ]========================*/
var express = require("express");
var path = require("path");

/* ===============[ Express Config ]=======================*/
var app = express();
var PORT = process.env.PORT || 7000;

// Use Features
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory.
app.use(express.static(path.resolve(__dirname,'public')));

// Set Handlebars
var express_handlebars = require("express-handlebars");
app.engine("handlebars", express_handlebars({ defaultLayout: "main"}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

// Router
var routes = require(path.resolve(__dirname, "./controllers/burgers_controller.js"));
app.use(routes);

app.listen(PORT, function(){
  console.log("App now listening at localhost: " + PORT);
});
