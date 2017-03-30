// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");

// Require the Models Schemas: Type and Property
var PropertyType = require("./models/Type.js");
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
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//make the public folder a static directory
app.use(express.static("./public"));

// ======================================================
// MongoDB Configuration configuration
// database configuration with mongoose using the mongodb database
// selected database name: 20170321project_three
//http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/20170321project_three");
//for rokehu
//0.5 webpack
//1?remove public/bundle.js from gitignore...
//2 remove public/bundle.js from github
//3increase bodyparser limits?
//change mongoose.connect to heroku database
//mongoose.connect('mongodb://heroku_4gsqkbvq:1gj0u70l41hhgl3msjn24lfv71@ds145380.mlab.com:45380/heroku_4gsqkbvq');

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

//route to send a POST request to save properties data to the database!
app.post('/load/tsv', function(request, response){	
	//function to Capitalize First Letter
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
			case 'rd':
				return 'Road';
			default:
				return s;
		}
	}
	//add all the contents of the array to Property (create one property for each object in the array, add this to Type: AT)
	//first check if MLS number already exists, if not, add property
	//https://docs.mongodb.com/v3.2/reference/method/db.collection.findOneAndUpdate/
	var rb = request.body;
	for(var i = 0; i < rb.length; i++){
		//http://stackoverflow.com/questions/40346534/mongoose-create-document-if-doesnt-exist
		//http://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
		// Property.findOneAndUpdate(
		// 	{mlsNum: rbo[i]['MLS #']},
		// 	{$setOnInsert:
		// 		{
		// 			typ: rbo[i].TYP,
		// 			compassPoint: rbo[i].CP,
		// 			strNumber: rbo[i]['Street #'],
		// 			PIN: rbo[i].PIN,
		// 			propTax: parseFloat(rbo[i].Taxes).toFixed(2)
		// 		}
		// 	},
		// 	{
		// 		new: true,// return new doc if one is upserted
		// 		upsert: true//insert the document if it does not exist
		// 	}
		// );

		if(rb[i].TYP==='AT'){
			Property.create({
				typ: rb[i].TYP,
				strNumber: rb[i]['Street #'],
				compassPoint: rb[i].CP.toLowerCase(),
				strName: rb[i]['Str Name'].toLowerCase(),
				sfx: rb[i].Sfx.toLowerCase(),
				unit: rb[i]['Unit #'],
				city: rb[i].City.toLowerCase(),
				state: rb[i].State.toLowerCase(),
				zip: rb[i].Zip,
				area: rb[i].Area,
				county: rb[i].County.toLowerCase(),
				subdiv: rb[i].Subdivision.toLowerCase(),
				gschDist: rb[i]['GS Dist'],
				hsDist: rb[i]['HS Dist'],
				totalUnits: rb[i]['Tot # Units'],
				typeDEAT: rb[i]['Type DE/AT'].toLowerCase(),
				//(must account for if no string present ie '', then don't parseInt)
				stories: isNaN(parseInt(rb[i]['# Stories'])) ? 0 : parseInt(rb[i]['# Stories']),
				yrBlt: rb[i]['Yr Blt'],
				mlsNum: rb[i]['MLS #'],
				status: rb[i].Stat,
				contingency: rb[i].Contingency.toLowerCase(),
				olp: parseInt(rb[i]['Orig List Pr']),
				searchPrice: parseInt(rb[i]['LP/SP']),
				sp: isNaN(parseInt(rb[i]['Sold Pr'])) ? rb[i]['Sold Pr'] : parseInt(rb[i]['Sold Pr']),
				lp: parseInt(rb[i]['List Price']),
				fin: rb[i].FIN.toLowerCase(),
				distressed: rb[i]['Short Sale/Foreclosed/Court Approved'].toLowerCase(),
				splp: rb[i]['SP:LP'],
				spolp: rb[i]['SP:OLP'],
				mt: parseInt(rb[i].MT),
				lmt: parseInt(rb[i].LMT),
				PIN: rb[i].PIN,
				multiPIN: rb[i]['Mult PINs'],
				addTaxInfo: rb[i]['Addl Tax Info'].toLowerCase(),
				commonPerctg: rb[i]['% Common'],
				propTax: isNaN(prepDollars(parseFloat(rb[i].Taxes))) ? rb[i].Taxes : prepDollars(parseFloat(rb[i].Taxes)).toFixed(2),
				taxExemps: rb[i]['Tax Exemps'].toLowerCase(),
				taxYear: rb[i]['Tax Year'],
				asmDues: isNaN(parseFloat(rb[i]['As/Asc Dues'])) ? rb[i]['As/Asc Dues'] : parseFloat(rb[i]['As/Asc Dues']).toFixed(2),
				maf: rb[i].MAF.toLowerCase(),
				mafAmount: isNaN(parseFloat(rb[i]['Master Association Fee($)'])) ? rb[i]['Master Association Fee($)'] : parseFloat(rb[i]['Master Association Fee($)']).toFixed(2),
				spAssess: rb[i]['Spec Assess'].toLowerCase(),
				ssa: rb[i]['Special Service Area'].toLowerCase(),
				ssaFee: isNaN(parseFloat(rb[i]['Special Service Area Fee'])) ? rb[i]['Special Service Area Fee'] : parseFloat(rb[i]['Special Service Area Fee']).toFixed(2),
				unitFl: rb[i]['Unit Fl No'],
				model: rb[i].Model.toLowerCase(),
				asf: isNaN(parseInt(rb[i].ASF)) ? rb[i].ASF : parseInt(rb[i].ASF),
				sfSource: rb[i]['SF Source'].toLowerCase(),
				totalSF: isNaN(parseInt(rb[i]['Total SF'])) ? rb[i]['Total SF'] : parseInt(rb[i]['Total SF']),
				mainSF: isNaN(parseInt(rb[i]['Main SF'])) ? rb[i]['Main SF'] : parseInt(rb[i]['Main SF']),
				aprxTFSF: isNaN(parseInt(rb[i]['Aprx Total Fin SF'])) ? rb[i]['Aprx Total Fin SF'] : parseInt(rb[i]['Aprx Total Fin SF']),
				exposure: rb[i].Exposure.toLowerCase(),
				rms: parseInt(rb[i]['# Rms']),
				bds: isNaN(parseInt(rb[i].Beds)) ? rb[i].Beds : parseInt(rb[i].Beds),
				allBeds: isNaN(parseInt(rb[i]['All Beds'])) ? rb[i]['All Beds'] : parseInt(rb[i]['All Beds']),
				bsmtBeds: isNaN(parseInt(rb[i]['Bsmt. Beds'])) ? rb[i]['Bsmt. Beds'] : parseInt(rb[i]['Bsmt. Beds']),
				bathF: parseInt(rb[i]['# Full Baths']),
				bathH: isNaN(parseInt(rb[i]['# Half Baths'])) ? rb[i]['# Half Baths'] : parseInt(rb[i]['# Half Baths']),
				bathsTotal: rb[i].Baths,
				fpInt: isNaN(parseInt(rb[i]['# Interior Fireplaces'])) ? rb[i]['# Interior Fireplaces'] : parseInt(rb[i]['# Interior Fireplaces']),
				garageSpaces: isNaN(parseInt(rb[i]['#GSp'])) ? rb[i]['#GSp'] : parseInt(rb[i]['#GSp']),
				garageType: rb[i]['Garage Type'].toLowerCase(),
				bsmt: rb[i].Bsmt.toLowerCase(),
				bsmtDesc: rb[i]['Basement Description'].toLowerCase(),
				remarks: rb[i].Remarks.toLowerCase(),
				agentRemarks: rb[i]['Agent Remarks'].toLowerCase(),
				numParkingSpaces: isNaN(parseInt(rb[i]['# Parking Spaces'])) ? 5555 : parseInt(rb[i]['# Parking Spaces']),
				acDesc: rb[i].Air.toLowerCase(),
				heatDesc: rb[i]['Heat/Fuel'].toLowerCase(),
				aag: rb[i].AAG.toLowerCase(),
				ipf: rb[i]['Interior Property Features'].toLowerCase(),
				parkingIncluded: rb[i]['Is Parking Included in Price?'].toLowerCase(),
				appliances: rb[i].Appliances.toLowerCase(),
				amenities: rb[i].Amen.toLowerCase(),
				commonAA: rb[i]['Com Ar Amen'].toLowerCase(),
				assesInc: rb[i]['Asses Incl'].toLowerCase(),
				managementCo: rb[i]['Management Company'].toLowerCase(),
				managementContactName: rb[i]['Management Contact Name'].toLowerCase(),
				managementPhone: rb[i]['Management Phone'],
				oop: rb[i]['% Own Occ'],
				rentable: rb[i]['Can Owner Rent'].toLowerCase(),
				parkingFee:isNaN(parseInt(rb[i]['Parking Fee/Lease $'])) ? 7777 : parseInt(rb[i]['Parking Fee/Lease $']),
				bd2Flr: rb[i]['2nd Bdr Flr'].toLowerCase(),
				bd3Flr: rb[i]['3rd Bdr Flr'].toLowerCase(),
				bd4Flr: rb[i]['4th Bdr Flr'].toLowerCase(),
				deededGarageCost: isNaN(parseInt(rb[i]['Deeded Garage Cost'])) ? rb[i]['Deeded Garage Cost'] : parseInt(rb[i]['Deeded Garage Cost']),
				deededParkingCost: isNaN(parseInt(rb[i]['Deeded Parking Cost'])) ? rb[i]['Deeded Parking Cost'] : parseInt(rb[i]['Deeded Parking Cost']),
				dinFlr: rb[i]['Din Flr'].toLowerCase(),
				equip: rb[i].Equipment.toLowerCase(),
				famRmFlr: rb[i]['Fam Rm Flr'].toLowerCase(),
				kitFlr: rb[i]['Kit Flr'].toLowerCase(),
				lrFlr: rb[i]['Liv Rm Flr'].toLowerCase(),
				mbdBa: rb[i]['Mast Bd Bth'].toLowerCase(),
				mbdFlr: rb[i]['Mast Bd Flr'].toLowerCase(),
				bd2Sz: rmDimConv(rb[i]['2nd Bdr Sz']),
				bd3Sz: rmDimConv(rb[i]['3rd Bdr Sz']),
				bd4Sz: rmDimConv(rb[i]['4th Bdr Sz']),
				mbdSz: rmDimConv(rb[i]['Mast Br Sz']),
				lrSz: rmDimConv(rb[i]['Liv Rm Sz']),
				kitSz: rmDimConv(rb[i]['Kit Sz']),
				frSz: rmDimConv(rb[i]['Fam Rm Sz']),
				drSz: rmDimConv(rb[i]['Din Sz']),
				addRms: rb[i]['Additional Rooms'].toLowerCase(),
				baAmen: rb[i]['Bth Amen'].toLowerCase(),
				drDesc: rb[i]['Din Rm'].toLowerCase(),
				extPropFeat: rb[i]['Exterior Property Features'].toLowerCase(),
				listDate: dateConv(rb[i]['List Date']),
				contractDate: dateConv(rb[i]['Contract Date']),
				offMktDate: dateConv(rb[i]['Off Mkt Dt']),
				clsdDate: dateConv(rb[i]['Closed Date']),
				acreage: rb[i].Acreage
			});
			//if index is randomly selected 11, add this condo address to LoadedAddresses
			if(i===11){
				var address = rb[11]['Street #'] + ' '+ compassPoint(rb[11].CP) + ' ' + toTitleCase(rb[11]['Str Name']) + ' ' + suffix(rb[11].Sfx);
				console.log('address added:',address);
				LoadedAddresses.create({
					Address: address
				});
			}
		}
	}

	//convert dollar amounts in case entry includes $ or ,
	//^\d selects all non-digit values; then the replace method replaces those values with ''
	function prepDollars(str){
		if(typeof str === 'string'){
			return str.replace(/([^\d])+/g, '');
		}else{
			//in the event str is a number, just return str because cannot use replace method on a number
			return str;
		}
	}

	//room dimension conversion from string 00X00 to array [00,00]
	function rmDimConv(str){
		if(str !== ''){
			var dimAr = [];
			for(var j = 0; j<str.length; j++){
				if(str[j]==='X'){
					dimAr.push(str.substr(0, j), str.slice(j+1));
					return dimAr;
				}
			}
		}else{
			return str;
		}
	}

	//convert date from 'MM/DD/YYYY' to integer YYYYMMDD
	//http://stackoverflow.com/questions/21291392/how-do-i-format-a-datetime-string-in-javascript-from-using-slashes-to-using-hype
	function dateConv(dStr){
		// var convDate = new Date(dStr);
		// if(dStr !== ''){
		// 	var foo = parseInt(convDate.toISOString().substr(0, 10).replace(/\-+/g, ''));
		// 	console.log('date:', foo);
		// 	return foo;
		// }else{
		// 	return dStr;
		// }
		if(dStr!==''){
			//substr value includes the values in start index and includes how many additional characters noted
			var redo = dStr.substr(6, 4) + dStr.substr(0, 2) + dStr.substr(3,2);
			return isNaN(parseInt(redo))? '':parseInt(redo);
		}else{
			return dStr;
		}
	}
});

//=======================
//FUNCTIONS FOR CONDUCTING A PROPERTY SEARCH
function randomEntry(array){
	return Math.floor(Math.random()*array.length);
}

var gSArrLength = 0;
var gsCount = 0;
function getSomething(array, key){
	var selected = randomEntry(array);
	if(array[selected][key] !== '' && array[selected][key] !== undefined){
		return array[selected][key];
	}else if(gsCount===gSArrLength){
		return array[randomEntry(array)][key];
	}else{
		gsCount ++;
		getSomething(array, key);
	}
}

function getSomethingBetter(array, key){
	var maxLengthEntry = '';
	for(var i = 0; i<array.length; i++){
		if(array[i][key] !== '' && array[i][key] !== undefined){
			if(array[i][key].length > maxLengthEntry){
				maxLengthEntry = array[i][key];
			}
		}
	}
	return maxLengthEntry;
}
//route to send POST requests to conduct a property search
app.post('/search', function(request, response){
	console.log('/search route in server.js: request.body', request.body);
	var rb = request.body;
	var tier = rb.unit.slice(-2);
	var possibleUnits = [];
	for(var i = 1; i<100; i++){
		var unitNumber = i + tier;
		possibleUnits.push(unitNumber);
	}
	var d = new Date();
	var currentDate = d.toISOString().slice(0,10).replace(/([^\d])+/g, '');
	var twoYearsPrior = parseInt([parseInt(currentDate.slice(0, 4))-2, currentDate.slice(4)].join(''));
	var oneYearPrior = parseInt([parseInt(currentDate.slice(0, 4))-1, currentDate.slice(4)].join(''));
	Property.find({//https://docs.mongodb.com/manual/reference/operator/query/
		typ: rb.typ,
		strNumber: rb.strNumber,
		strName: rb.strName.toLowerCase(),
		status: { $in: ['CLSD', 'PEND']},
		// unit: { $in: possibleUnits},
		clsdDate: {$gte: twoYearsPrior}
	})
	// .limit(9)
	.select('typ strNumber strName sfx unit totalUnits mlsNum status clsdDate ' +
		'sp lp olp fin distressed contractDate listDate ' +
		'mt propTax asmDues rms bds bathF bathH asf exposure PIN ' +
		'commonAA assesInc')
	.sort({
		clsdDate: -1
	}).exec(function(error, doc){
		if(error){
			console.log('/api/find/test/properties error: ',error);
		}else{
			//analyze the properties here.
			var ranking = [];
			//1. search for same tier within prior 12 months
			//if less than 3 results, search for units with similar square feet (within 5 - 10% of subject)
			//may want to calculate which tiers have similar square feet (and account for entries where sqft is 0)
			//still if less than 3 results, search for sales with similar assessments / taxes

			//1.5 parse through remarks to create "updated score" for the comparables
			//2. once 3+ results found, rank (according to close date, number of differences, etc)

			//add keys and values for adjustments to each of the objects in doc.
			var adjustments = [];
			//keys to add and calculate:
			//then sort the results according to ranking

			//create building analysis (statistics, info):
			var unitsSold1 = 0;
			for(var j = 0; j<doc.length; j++){
				if(doc[j].clsdDate>oneYearPrior){
					unitsSold1 ++;
				}
			}
			var statistics = {
				unitsSold2412: doc.length - unitsSold1,
				unitsSold1200: unitsSold1, 
				medSP2: 0,
				medSP1: 0,
				meanSP2: 0,
				meanSP1: 0,
				meanSPASF2: 320.05,
				meanSPASF1: 345.77,
				meanMT2: 55,
				meanMT1: 47,
				meanLMT2: 75,
				meanLMT1: 60,
				meanSPLP2: '97.65%',
				meanSPLP1: '98.23%',
				meanSPOLP2: '89.66%',
				meanSPOLP1: '93.48%'
			};
			gSArrLength = doc.length;
			//reset the gsCount
			gsCount = 0;
			var info = {
				units: getSomethingBetter(doc, 'totalUnits'),
				buildingAmen: getSomethingBetter(doc, 'amenities'),
				commonAmen: getSomethingBetter(doc, 'commonAA'),
				assessInc: getSomethingBetter(doc, 'assesInc')
			};

			//BEGIN TEST QUERY WITHIN QUERY
			Property.find({//https://docs.mongodb.com/manual/reference/operator/query/
				typ: rb.typ,
				strNumber: rb.strNumber,
				strName: rb.strName.toLowerCase(),
				//unit: { $gt: rb.unitNumber},
				status: { $in: ['CLSD', 'PEND']},
				unit: { $in: possibleUnits},
				clsdDate: {$gte: twoYearsPrior},
			})
			.select('strNumber strName sfx unit typ mlsNum status clsdDate ' +
				'sp lp olp fin distressed contractDate listDate ' +
				'mt propTax asmDues rms bds bathF bathH asf exposure PIN')
			.sort({
				clsdDate: -1
			}).exec(function(error, cmaMatches){
				if(error){
					console.log('/api/find/test/properties error: ',error);
				}else{
					var allResults = [];
					allResults.push(doc, cmaMatches, ranking, adjustments, statistics, info);
					console.log('all results from server.js', allResults);
					response.send(allResults);
				}
			});
			//END TEST QITHIN QUERY


			//ORIGINAL ENDING BEFORE TEST QUERY:
			// var allResults = [];
			// allResults.push(doc, ranking, adjustments, statistics, info);
			// console.log('all results from server.js', allResults);
			// response.send(allResults);
			// //response.json(doc);
		}
	});
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

//route to send requests to delete the saved addresses or properties (received from helpers.js)
app.get('/api/delete/:what', function(request, response){
	var selection = request.params.what;
	switch(selection){
		case 'loadedAd':
			LoadedAddresses.remove({}, function(error){
				if(error){
					console.log('/api/delete/loadedAddresses error:',error);
				}
			});
			break;
		case 'allProperties':
			Property.remove({}, function(error){
				if(error){
					console.log('/api/delete/allProperties error:', error);
				}
			});
			break;
		default:
			console.log('unknown thing requested for deletion server.js:', selection);
			break;
	}
	
});

// Main "/" Route. This will redirect the user to the rendered React application
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// ======================================================
// routes for tsv files
//this get request received from SearchProperty.js in loadDB function
app.get('/tsv/:fileName', function(req, res){
	res.sendFile(__dirname + '/tsv_files/' + req.params.fileName);
});

// ======================================================
// future considerations
// start timer on log-in (mark log-in time)
// note when browser closed or when user logs out
// difference is time spent active on the site? how to measure this?
// what if multiple tabs open in the user's browser? how to 
// measure active time on my site only?

// ======================================================
// Listener
//to run locally; mongod; mongo; webpack -w; node server.js
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});