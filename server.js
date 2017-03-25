// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");

// Require the Models Schemas: Type and Property
var Type = require("./models/Type.js");
var Property = require("./models/Property.js");

// Create Instance of Express
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
//app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//make the public folder a static directory
app.use(express.static("./public"));

// ======================================================
// MongoDB Configuration configuration
// database configuration with mongoose using the mongodb database
// selected database name: 20170321project_three
mongoose.connect("mongodb://localhost/20170321project_three");
//CHANGE TO ACTUAL HEROKU MONGOOSE FOR THIS APPmongoose.connect('mongodb://heroku_r1w606z5:8nvt5hgu5afgmg73da40o9g8hg@ds119750.mlab.com:19750/heroku_r1w606z5');

//save the mongoose connection to db
var db = mongoose.connection;

db.on("error", function(err) {
	console.log("Mongoose Error: ", err);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// ======================================================
//routes:

// This is the route we will send GET requests to retrieve any saved articles
// We will call this route the moment our page gets rendered
// app.get("/api", function(request, response) {
// 	Article.find({}).exec(function(error, doc){
// 		if(error){
// 			console.log(error);
// 		}else{
// 			response.send(doc);
// 		}
// 	});
// });

//route to send POST requests to conduct a search
app.post('/search', function(request, response){
	response.json(request.body);
});

// //route to send DELETE requests to delete an article (received from helpers.js)
// //app.delete('/api', function(request, response){
// app.post('/delete/article', function(request, response){
// 	Article.remove({_id:request.body.article}, function(error){
// 		if(error){
// 			console.log(error);
// 		}
// 	});
// });

// Main "/" Route. This will redirect the user to the rendered React application
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// ======================================================
// routes for tsv files
app.get('/tsvplease', function(req, res){
	res.sendFile(__dirname + '/tsv_files/export900michigan.TSV');
});

app.get('/tsvTwo', function(req, res){
	res.sendFile(__dirname + '/tsv_files/800michigan.TSV');
});

// ======================================================
// Listener
//to run locally; mongod; mongo; webpack -w; node server.js
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});