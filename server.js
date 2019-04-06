// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var router = require("./app/routes");
var morgan = require("morgan");

// configure app
app.use(morgan("dev")); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000; // set our port

// DATABASE SETUP

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = router;

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening.");
  next();
});

// REGISTER OUR ROUTES -------------------------------
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
