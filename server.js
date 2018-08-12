//Required dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Port
var PORT = process.env.PORT || 3000;

//Express
var app = express();

//Express router
var router = express.Router();

//Require routes file
require("./config/routes")(router);

//Designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//BodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have requests go through router middleware
app.use(router);

//If deployed, use the deployed database.  Otherwise use the local mongoHeadlines database
var db = process.env.MONGOB_URI || "mongodb://localhost/mongoHeadLines";

//Connect mongoose to our database
mongoose.connect(db, function(error) {
//Log any errors connecting with mongoose
if (error) {
    console.log(error);
}
//Or log a success
else {
    console.log("Mongoose connection is successful");
}
});

//Listen to the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});