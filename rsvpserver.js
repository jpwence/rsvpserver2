// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const _ = require('lodash');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// This was left as a blank array so that we wouldn't have a reserved table
// =============================================================
var reserved = [];

//var waiting = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Search for Specific Character (or all tables) - provides JSON
app.get("/api/tables", function(req, res) {
  var chosen = req.params.reserved;
  var reserves = _.take(reserved, 5);

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reserves.length; i++) {
      if (chosen === reserves[i].routeName) {
       return res.json(reserves[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reserves);
});

app.get("/api/waitlist", function(req, res) {
<<<<<<< HEAD
  var chosen = req.params.reserved;
  var waiting = _.slice(reserved, 5);

  console.log('waiting');
  console.log(waiting);
  //console.log(waiting);
=======
  var chosen = req.params.waiting;
>>>>>>> b0080e90e8f21d7fad9981a5b15db5eec6d42955

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < waiting.length; i++) {
      if (chosen === waiting[i].routeName) {
       return res.json(waiting[i]);
      }
    }
    return res.json(false);
  }
  return res.json(waiting);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  var newtable = req.body;

  //newtable.customerID = newtable.customerID.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

<<<<<<< HEAD
  //console.log(reserved.length);

  reserved.push(newtable);
  // if (reserved.length <= 5){
  //   reserved.push(newtable);
  // } else {
  //   waiting.push(newtable);
  // }

// console.log('reserved');
//   console.log(reserved);
//   console.log('waiting');
//   console.log(waiting)

=======
  if (reserved.length < 5){
  	reserved.push(newtable);
  } else {
  	waiting.push(newtable);
  }
console.log(reserved);
console.log(waiting);
>>>>>>> b0080e90e8f21d7fad9981a5b15db5eec6d42955
  res.json(newtable);
});


// Create New tables - takes in JSON input
app.post("/api/clear", function(req, res) {
  reserved = [];
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});