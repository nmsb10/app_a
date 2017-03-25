// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");
var d3 = require("d3");//https://www.npmjs.com/package/d3

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
//going through the TSV files:
//http://stackoverflow.com/questions/16177037/how-to-extract-information-in-a-tsv-file-and-save-it-in-an-array-in-javascript
//https://github.com/d3/d3-request
//nb: The d3.tsv method makes an AJAX request for data.
// d3.tsv("./export900michigan.TSV", function(error, data) {
// 	if(error){
// 		console.log(error);
// 	}else{
// 		console.log(data);
// 	}
// });
//http://learnjsdata.com/read_data.html
// d3.queue()
//   .defer(d3.csv, "/data/cities.csv")
//   .defer(d3.tsv, "/data/animals.tsv")
//   .await(analyze);

// function analyze(error, cities, animals) {
//   if(error) { console.log(error); }

//   console.log(cities[0]);
//   console.log(animals[0]);
// }


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

app.get('/tsvplease', function(req, res){
	res.sendFile(__dirname + '/mls_data_manually_downloaded/export900michigan.TSV');
});

// ======================================================
// Listener
//to run locally; mongod; mongo; webpack -w; node server.js
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});