// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");

// Require the Models Schemas: Type and Property
var Type = require("./models/Type.js");
var Property = require("./models/Property.js");
var LoadedAddresses = require("./models/LoadedAddresses.js");

// Create Instance of Express
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
//app.use(logger("dev"));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
//app.use(bodyParser.json({ type: "application/vnd.api+json"}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

//make the public folder a static directory
app.use(express.static("./public"));

// ======================================================
// MongoDB Configuration configuration
// database configuration with mongoose using the mongodb database
// selected database name: 20170321project_three
//http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.Promise = global.Promise;
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

//route to send a POST request to save properties to the database!
app.post('/load/tsv', function(request, response){
	//re = random entry
	var re = Math.floor(Math.random()*request.body.length);
	//first add this condo address to LoadedAddresses
	if(request.body[re].TYP==='AT'){
		var address = request.body[re]['Street #'] + ' '+ compassPoint(request.body[re].CP) + ' ' + toTitleCase(request.body[re]['Str Name']) + ' ' + suffix(request.body[re].Sfx);
		LoadedAddresses.create({
			Address: address
		}, function(error){
			if(error){
				console.log('error adding to loaded addresses model: ',error);
			}
		});
	}
	//Capitalize First Letter
	function cfl(word) {
		console.log('street name:',word);
		console.log(typeof word);
		word.toLowerCase();
		//account for if street name has multiple words
		var words = word.split(' ');
		console.log('words', words);
		var streetName = [];
		for(var i = 0; i<words.length; i++){
			streetName.push(words[i].charAt(0).toUpperCase() + words[i].slice(1));
		}
		console.log('total street name after transformation', streetName);
		return streetName.join(' ');
	}
	function toTitleCase(str)//http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
	{
		return str.replace(/([^\W_]+[^\s-]*) */g, function(txt)
		{
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
	//d = direction
	function compassPoint(d){
		switch(d){
			case 'N':
				return 'North';
			case 'E':
				return 'East';
			case 'W':
				return 'West';
			case 'S':
				return 'South';
			default:
				return d;
		}
	}
	function suffix(s){
		switch(s.toLowerCase()){
			case 'ave':
				return 'Avenue';
			case 'st':
				return 'Street';
			case 'pl':
				return 'Place';
			case 'dr':
				return 'Drive';
			default:
				return s;
		}
	}
	//then add all the contents of the array to Property (create one property for each object in the array, add this to Type: AT)
	//change certain inputs:
	var rb = request.body[15];
	console.log('changing strings to integers:', rb['# Stories'] + ' ' + parseInt(rb['# Stories']) + ' ' + typeof rb['Orig List Pr'] + ' ' + typeof parseInt(rb['Orig List Pr']));
	//(must account for if no string present ie '', then don't parseInt): parseInt: orig list pr, search price, sold pr, list price, mt, lmt, (parseFloat with 2 decimal places) taxes, (parseFloat) as/asc dues, (parseFloat) mafAmount, (parseFloat) special service area fee, ASF, total SF, Main SF, Aprx total fin SF, # rms, Beds, All Beds, bsmt beds, # Full Baths, # Half Baths, interior fireplaces, garagespaces, parking spaces
	//change dates to YYYYMMDD
	//http://stackoverflow.com/questions/21291392/how-do-i-format-a-datetime-string-in-javascript-from-using-slashes-to-using-hype
	var dateStr = rb['List Date'];
	var testdate = new Date(dateStr);
	var curr_date = testdate.getDate();
var curr_month = testdate.getMonth();
curr_month++;  //We add +1 because Jan is indexed at 0 instead of 1
var curr_year = testdate.getFullYear();
console.log('here\'s the re-formatted date:', curr_year + "-" + curr_month + "-" + curr_date);
var date2test = new Date(dateStr).toISOString().substr(0, 10).replace(/\-+/g, '');
console.log('iso string date test', date2test + ' ' + typeof date2test + ' '+ typeof parseInt(date2test));
});

//route to send POST requests to conduct a property search
app.post('/search', function(request, response){
	console.log('/search route in server.js: request.body', request.body);
	var thing = {
		propertyOne: 'ice cream',
		property2: 'caramel crunchy stuff',
		prop3: 'way beyond'
	};
	response.json(thing);
	//response.json(request.body);
});

// This is the route we will send GET requests to retrieve any addresses loaded
// We will call this route the moment our page gets rendered
app.get('/api/find/addresses', function(request, response) {
	LoadedAddresses.find({}).exec(function(error, doc){
		if(error){
			console.log('/api/find/addresses error: ',error);
		}else{
			response.send(doc);
		}
	});
});

//route to send DELETE requests to delete the saved addresses (received from helpers.js)
//app.delete('/api', function(request, response){
app.post('/api/delete/addresses', function(request, response){
	LoadedAddresses.remove({}, function(error){
		if(error){
			console.log('/api/delete/addresses error:',error);
		}
	});
});

// Main "/" Route. This will redirect the user to the rendered React application
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// ======================================================
// routes for tsv files

app.get('/tsv/:fileName', function(req, res){
	res.sendFile(__dirname + '/tsv_files/' + req.params.fileName);
});

// ======================================================
// Listener
//to run locally; mongod; mongo; webpack -w; node server.js
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});