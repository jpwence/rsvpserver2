// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

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

var waiting = [];

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

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reserved.length; i++) {
      if (chosen === reserved[i].routeName) {
       return res.json(reserved[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reserved);
});

app.get("/api/waitlist", function(req, res) {
  var chosen = req.params.waiting;

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

  newtable.customerID = newtable.customerID.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  if (reserved.length < 5){
  	reserved.push(newtable);
  } else {
  	waiting.push(newtable);
  }
console.log(reserved);
console.log(waiting);
  res.json(newtable);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});