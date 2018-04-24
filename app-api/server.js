// server.js
var express = require("express");
var bodyParser = require("body-parser");

// Sets up Express
var app = express();
var PORT = process.env.PORT || 8080;

// Sync with db
var db = require("./models");

// Express handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/api-routes.js")(app);

// Sequelize models and then start Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
  });
});
