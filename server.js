// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");

// Require the Models Schemas: Type and Property
var PropertyType = require("./models/Type.js");
var Property = require("./models/Property.js");
var LoadedAddresses = require("./models/LoadedAddresses.js");
var SearchesUser = require('./models/UserSearches.js');

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
//mongoose.connect("mongodb://localhost/20170321project_three");
//for rokehu
//0.5 webpack
//1?remove public/bundle.js from gitignore...
//2 remove public/bundle.js from github
//3increase bodyparser limits?
//4if adding tsv files, add tsv file folder to within app_a folder
//change mongoose.connect to heroku database
mongoose.connect('mongodb://heroku_4gsqkbvq:1gj0u70l41hhgl3msjn24lfv71@ds145380.mlab.com:45380/heroku_4gsqkbvq');

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
			case 'ter':
				return 'Terrace';
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

function getLargestNumber(array, key){
	var highest = 0;
	for(var i = 0; i<array.length; i++){
		if(array[i][key]>=highest){
			highest = array[i][key];
		}
	}
	return highest;
}

function findPerc(far, close){
	return parseFloat(100*(close - far)/far).toFixed(2);
}
function calculateMean(array, entries, decimalPlaces){
	//forEach? reduce?
	var sum = 0;
	for(var i = 0; i<array.length; i++){
		sum += array[i];
	}
	return (sum / entries).toFixed(decimalPlaces);
}

function addToArrayAsc(array, newEntry, low, high){
	array.push(newEntry);
	array.sort(function(a, b){return a-b;});
}

function calculateMedian(array){
	if(array.length%2 !== 0){//odd number
		return array[Math.floor(array.length/2)];
	}else{
		return (array[Math.floor(array.length/2)]+array[Math.floor(array.length/2)-1])/2;
	}
}

function quicksort(array){
	if(array.length<2){
		return array;
	}
	//pivot is the first element of the array
	var pivot = array.shift();
	var lessArray = [];
	var moreArray = [];
	for(var i = 0; i<array.length; i++){
		if(array[i]<=pivot){
			lessArray.push(array[i]);
		}else{
			moreArray.push(array[i]);
		}
	}
	return quicksort(lessArray).concat(pivot,quicksort(moreArray));
}

//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function withCommas(x) {
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function commonName(num, name){
	switch(num+name){
		case '800michigan':
			return 'Park Tower';
		case '505lake shore':
			return 'Lake Point Tower';
		case '1720maple':
			return 'Optima Views Evanston';
		case '807davis':
			return 'The Residences of Sherman Plaza Evanston';
		case '655irving park':
			return 'Park Place Tower';
		case '159walton':
			return 'Palmolive Building Landmark';
		case '161chicago':
			return 'Olympia Centre';
		case '175delaware':
			return '(john hancock residences)';
		case '400randolph':
			return 'Outer Drive East';
		case '840lake shore':
			return 'The Residences on Lake Shore Park';
		case '950michigan':
			return 'One Magnificent Mile';
		case '222pearson':
			return 'Pearson on the Park';
		case '3200lake shore':
			return 'Harbor House';
		case'235van buren':
			return 'designed by Perkins & Will | built by CMK Companies';
		case '401wabash':
			return 'Trump Tower Chicago';
		case '180pearson':
			return 'Water Tower Residences';
		case '545dearborn':
			return 'Grand Plaza';
		case '1201prairie':
			return 'The Grant';
		case '1211prairie':
			return 'One Museum Park (East Residences)';
		case '1235prairie':
			return 'Museum Park Tower IV';
		case '1212lasalle':
			return 'LaSalle Private Residences';
		case '1250lasalle':
			return 'Gallery 1250';
		case '1255sandburg':
			return 'Eliot House of Sandburg Village';
		case '1355sandburg':
			return 'Dickinson House of Sandburg Village';
		case '1360sandburg':
			return 'Cummings House of Sandburg Village';
		case '1455sandburg':
			return 'Bryant House of Sandburg Village';
		case '1460sandburg':
			return 'Alcott House of Sandburg Village';
		case '1560sandburg':
			return 'James House of Sandburg Village';
		default:
			return '';
	}
}

function monthsDifference(todayMonth, todayYear, beforeMonth, beforeYear){
	var dif = (todayMonth - beforeMonth + (12 * (todayYear -beforeYear)));
	return dif <=0 ? 0: dif;
}
//getSum necessary when totaling adjustments
function getSum(total, num) {
	return total + num;
}

//route to send POST requests to conduct a property search
app.post('/search', function(request, response){
	//console.log('/search route in server.js: request.body', request.body);
	var rb = request.body;
	var d = new Date();
	var currentDate = d.toISOString().slice(0,10).replace(/([^\d])+/g, '');
	var twoYearsPrior = parseInt([parseInt(currentDate.slice(0, 4))-2, currentDate.slice(4)].join(''));
	var oneYearPrior = parseInt([parseInt(currentDate.slice(0, 4))-1, currentDate.slice(4)].join(''));
	//first query for building statistics:
	//=========================================
	//added so "today" is always 20170401 - 20170408
	var sampleToday = Math.floor((Math.random()*8+1));
	twoYearsPrior = parseInt(''+2015040+sampleToday);
	oneYearPrior = parseInt(''+2016040+sampleToday);
	//=========================================
	//================================================
	//add the address to SearchesUser:
	var userAddress = rb.typ + ' ' + rb.strNumber + ' ' + rb.strName +  ', unit ' + rb.unit +  ' | sqft: ' + rb.asf + ' | assessments: $'+ rb.asmDues + ' | taxes: $' + rb.propTax + ' | ' + rb.bds + ' beds' + ', ' + rb.bathF + ' full baths.';
	SearchesUser.create({
		AddressEntered: userAddress,
		type: rb.typ,
		streetNumber: rb.strNumber,
		streetName: rb.strName,
		unit: rb.unit,
		asf: isNaN(parseInt(rb.asf)) ? rb.asf : parseInt(rb.asf),
		assessments: isNaN(parseFloat(rb.asmDues)) ? rb.asmDues : parseFloat(rb.asmDues).toFixed(2),
		taxes: isNaN(parseFloat(rb.propTax)) ? rb.propTax : parseFloat(rb.propTax).toFixed(2),
		bedrooms: isNaN(parseInt(rb.bds)) ? rb.bds : parseInt(rb.bds),
		bathrooms: isNaN(parseInt(rb.bathF)) ? rb.bathF : parseInt(rb.bathF)
	});
	//================================================
	Property.find({//https://docs.mongodb.com/manual/reference/operator/query/
		typ: rb.typ,
		strNumber: rb.strNumber,
		strName: rb.strName.toLowerCase(),
		status: 'CLSD',
		clsdDate: {$gte: twoYearsPrior}
	})
	.select('clsdDate totalUnits commonAA assesInc amenities ' +
		'sp asf mt lmt lp olp stories')
	.sort({
		clsdDate: -1
	}).exec(function(error, doc){
		if(error){
			console.log('/search error: ', error);
		}else{
			//CREATE BUILDING ANALYSIS (statistics, info):
			//remember: 2 denotes 24 - 12 months ago
			//1 denotes 12 - 0 months ago
			var unitsSold1 = 0;
			var listDataSP2 = [];
			var listDataSP1 = [];
			var spasfArray2 = [];
			var spasfArray1 = [];
			var mt2 = [];
			var mt1 = [];
			var lmt2 = [];
			var lmt1 = [];
			var splp2 = [];
			var splp1 = [];
			var spolp2 = [];
			var spolp1 = [];
			for(var j = 0; j<doc.length; j++){
				if(doc[j].clsdDate>oneYearPrior){
					unitsSold1 ++;
					listDataSP1.push(doc[j].sp);
					if(doc[j].asf !== 0 && doc[j].asf !== ''){
						var spasf = (doc[j].sp / doc[j].asf);
						spasfArray1.push(spasf);
					}
					mt1.push(doc[j].mt);
					lmt1.push(doc[j].lmt);
					splp1.push(100 * doc[j].sp / doc[j].lp);
					spolp1.push(100 * doc[j].sp / doc[j].olp);
				}else{
					listDataSP2.push(doc[j].sp);
					if(doc[j].asf !== 0 && doc[j].asf !== ''){
						var spasf2 = (doc[j].sp / doc[j].asf);
						spasfArray2.push(spasf2);
					}
					mt2.push(doc[j].mt);
					lmt2.push(doc[j].lmt);
					splp2.push(100* doc[j].sp / doc[j].lp);
					spolp2.push(100*doc[j].sp / doc[j].olp);
				}
			}
			var info = {
				name: commonName(rb.strNumber,rb.strName.toLowerCase()),
				units: getSomethingBetter(doc, 'totalUnits'),
				commonAmen: getSomethingBetter(doc, 'commonAA'),
				assessInc: getSomethingBetter(doc, 'assesInc'),
				stories: getLargestNumber(doc, 'stories'),
				buildingAmen: getSomethingBetter(doc, 'amenities')
			};
			var stats = {
				unitsSold2412: doc.length - unitsSold1,
				unitsSold1200: unitsSold1,
				usChange:0,
				turnover2: 0,
				turnover1: 0,
				toChange:0,
				medSP2: calculateMedian(quicksort(listDataSP2)),
				medSP1: calculateMedian(quicksort(listDataSP1)),
				medspChange:'',
				meanSP2: calculateMean(listDataSP2, listDataSP2.length, 0),
				meanSP1: calculateMean(listDataSP1, listDataSP1.length, 0),
				meanspChange: '',
				meanSPASF2: calculateMean(spasfArray2, spasfArray2.length, 2),
				meanSPASF1: calculateMean(spasfArray1, spasfArray1.length, 2),
				meanSPASFChange:'',
				meanMT2: calculateMean(mt2, mt2.length, 0),
				meanMT1: calculateMean(mt1, mt1.length, 0),
				meanMTChange:'',
				meanLMT2: calculateMean(lmt2, lmt2.length, 0),
				meanLMT1: calculateMean(lmt1, lmt1.length, 0),
				meanLMTChange:'',
				meanSPLP2: calculateMean(splp2, splp2.length, 2),
				meanSPLP1: calculateMean(splp1, splp1.length, 2),
				meanSPLPChange: '',
				meanSPOLP2: calculateMean(spolp2, spolp2.length, 2),
				meanSPOLP1: calculateMean(spolp1, spolp1.length, 2),
				meanSPOLPChange: ''
			};
			stats.usChange = findPerc(stats.unitsSold2412, stats.unitsSold1200);
			stats.turnover2 = parseFloat(100 * stats.unitsSold2412 / parseInt(info.units)).toFixed(2);
			stats.turnover1 = parseFloat(100 * stats.unitsSold1200 / parseInt(info.units)).toFixed(2);
			stats.toChange = findPerc(stats.turnover2, stats.turnover1);
			stats.medspChange = findPerc(stats.medSP2, stats.medSP1);
			stats.medSP2 = withCommas(stats.medSP2.toString());
			stats.medSP1 = withCommas(stats.medSP1.toString());
			stats.meanspChange = findPerc(stats.meanSP2, stats.meanSP1);
			stats.meanSP2 = withCommas(stats.meanSP2.toString());
			stats.meanSP1 = withCommas(stats.meanSP1.toString());
			stats.meanSPASFChange = findPerc(stats.meanSPASF2, stats.meanSPASF1);
			stats.meanMTChange = findPerc(stats.meanMT2, stats.meanMT1);
			stats.meanLMTChange = findPerc(stats.meanLMT2, stats.meanLMT1);
			stats.meanSPLPChange = findPerc(stats.meanSPLP2, stats.meanSPLP1);
			stats.meanSPOLPChange = findPerc(stats.meanSPOLP2, stats.meanSPOLP1);

			//BEGIN QUERY WITHIN QUERY FOR COMPARABLES ANALYSIS
			var tier = '';
			var possibleUnits = [];
			if(rb.unit !== ''){
				if(isNaN(parseInt(rb.unit.slice(-2)))){
					tier = rb.unit.slice(-2).toUpperCase();
				}else if(isNaN(parseInt(rb.unit.slice(-1)))){
					tier = rb.unit.slice(-1).toUpperCase();
				}else{
					tier = rb.unit.slice(-2);
				}
				for(var i = 1; i<100; i++){
					var unitNumber = i + tier;
					possibleUnits.push(unitNumber);
				}
			}
			var asfRange = -100;
			if(rb.asf !== ''){
				asfRange = parseInt(rb.asf);
			}
			Property.find({//https://docs.mongodb.com/manual/reference/operator/query/
				typ: rb.typ,
				strNumber: rb.strNumber,
				strName: rb.strName.toLowerCase(),
				//unit: { $gt: rb.unitNumber},
				status: { $in: ['CLSD', 'PEND']},
				$or: [{
					unit: { $in: possibleUnits}},{
					asf:{
						$gte: 0.93*asfRange,
						$lte: 1.07*asfRange
					}
				}],
				clsdDate: {$gte: oneYearPrior},
			})
		// .limit(9)
			.select('strNumber strName sfx unit typ mlsNum status clsdDate ' +
				'sp lp olp fin distressed contractDate listDate ' +
				'mt propTax asmDues rms bds bathF bathH asf sfSource exposure PIN')
			.sort({
				clsdDate: -1,
			}).exec(function(error, cmat){//formerly cmaMatches; cmat = cma material
				if(error){
					console.log('/api/find/test/properties error: ',error);
				}else{
					//analyze the COMPARABLES properties here.
					var ranking = [];
					//1. search for same tier within prior 12 months
					//if less than 3 results, search for units with similar square feet (within 5 - 10% of subject)
					//may want to calculate which tiers have similar square feet (and account for entries where sqft is 0)
					//still if less than 3 results, search for sales with similar assessments / taxes

					//1.5 parse through remarks to create "updated score" for the comparables
					//2. once 3+ results found, rank (according to close date, number of differences, etc)
					//NB: this rank could be simply, the less adjustments made, the closer the comp??

					//add keys and values for adjustments to each of the objects in doc.
					var adjustments = [[],[],[]];
					//keys to add and calculate:
					//then sort the results according to ranking
					var allResults = [];

					//after receiving the database data (an array of three arrays),
					//create the finalArray to send for mapping on cma results
					//here we are giving each of the first 3 properties arrays the
					//newKeys key values,
					//then currently setting those key values to foo, bar, baz
					var finalArray = [];
					var newKeys = [
						'adjUpdates',
						'adjMechanicals',
						'adjHW',
						'adjPremLoc',
					];

					//categories array:
					//!if you change anything here, must make same change to catarrlegent!!
					var catArr = [
						'address',
						'property type',
						'mls #',
						'status',
						'closed date',
						'appreciating / declining market adjustment',
						'sold price',
						'list price',
						'original list price',
						'sp/olp | sp/lp',
						'financing type',
						'distressed?',
						'contract date',
						'list date',
						'market time',
						'property taxes',
						'assessments',
						'# rooms',
						'# bedrooms',
						'# full bathrooms',
						'# half bathrooms',
						'ASF & source',
						'exposure(s)',
						'PIN(s)',
						'updates adjustment',
						'mechanicals adjustment',
						'hw floors adjustment',
						'premium location adjustment',
						'Net Adjustments',
						'Net Adjustments %',
						'SP / ASF',
						'Adjusted SP / ASF',
						'Adjusted Sale Price',
						'Confidence Score'
					];

					//catarrlegend has the key value (for the individual properties) at the same index for the categories to go in the cma table
					var catarrlegend = [
						'strNumber',
						'typ',
						'mlsNum',
						'status',
						'clsdDate',
						'marketFA',
						'sp',
						'lp',
						'olp',
						'splpRatios',
						'fin',
						'distressed',
						'contractDate',
						'listDate',
						'mt',
						'propTax',
						'asmDues',
						'rms',
						'bds',
						'bathF',
						'bathH',
						'asf',
						'exposure',
						'PIN',
						'adjUpdates',
						'adjMechanicals',
						'adjHW',
						'adjPremLoc',
						'netAdjustments',
						'netAdjustmentsPerc',
						'SPtoASF',
						'adjSPtoASF',
						'adjustedSalePrice',
						'confidence'
					];

					var fillerObject = {
						mlsNum: '',
						status: '',
						clsdDate:'',
						marketFA:'',
						sp:'',
						lp:'',
						olp:'',
						splpRatios:'',
						finType:'',
						distressed:'',
						contractDate:'',
						listDate:'',
						mt:'',
						rms:'',
						exposure:'',
						PIN:'',
						adjUpdates:'',
						adjMechanicals:'',
						adjHW:'',
						adjPremLoc:'',
						netAdjustments:'',
						netAdjustmentsPerc:'',
						SPtoASF:'',
						adjSPtoASF:'',
						adjustedSalePrice:'',
						typ:'AT',
						strNumber: '',
						strName: '',
						unit:'',
						asf:'',
						asmDues:'',
						propTax:'',
						bds: '',
						bathF: ''
					};
					
					//manipulate values here
					//ie create full address, add commas and $ to prices, taxes, assessments
					var compsSelected = false;
					if(cmat.length > 1){
						if(cmat.length===2){
							cmat.push(fillerObject);
						}
						compsSelected = true;
						var fbb = ['foo', 'bar', 'baz'];
						for(var k = 0; k< newKeys.length; k++){
							cmat[0][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
							cmat[1][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
							cmat[2][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
						}
						for(var i = 0; i<catArr.length; i++){
							//table line array (table row)
							var tla = [];
							if(i===0){
								tla[0] = catArr[i];
								var subjectAddressUnit = rb.unit !== '' ? ', unit ' + rb.unit : '';
								tla[1] = rb.strNumber + ' '+ rb.strName + subjectAddressUnit;
								tla[2] = cmat[0].strNumber + ' ' + cmat[0].strName + ' '+ cmat[0].sfx + ', unit ' + cmat[0].unit;
								tla[3] = '';
								tla[4] = cmat[1].strNumber + ' ' + cmat[1].strName + ' '+ cmat[1].sfx + ', unit ' + cmat[1].unit;
								tla[5] = '';
								tla[6] = cmat[2].strNumber + ' ' + cmat[2].strName + ' '+ cmat[2].sfx + ', unit ' + cmat[2].unit;
								tla[7] = '';
								finalArray.push(tla);
							}else if(i===4 || i===12 || i===13){//closed date, contract date, list date
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = cmat[0][catarrlegend[i]].toString().substr(4,2) + '.' + cmat[0][catarrlegend[i]].toString().substr(6,2) + '.' + cmat[0][catarrlegend[i]].toString().substr(0,4);
								tla[3] = '';
								tla[4] = cmat[1][catarrlegend[i]].toString().substr(4,2) + '.' + cmat[1][catarrlegend[i]].toString().substr(6,2) + '.' + cmat[1][catarrlegend[i]].toString().substr(0,4);
								tla[5] = '';
								tla[6] = cmat[2][catarrlegend[i]].toString().substr(4,2) + '.' + cmat[2][catarrlegend[i]].toString().substr(6,2) + '.' + cmat[2][catarrlegend[i]].toString().substr(0,4);
								tla[7] = '';
								finalArray.push(tla);
							}else if(i===5){//appreciating / declining market factor adjustment
								var monthlyChange = (stats.medspChange/12).toFixed(2);
								var today = new Date();
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = monthlyChange + '%';
								var comp1adj = Math.floor((monthlyChange * 0.0001 * monthsDifference(today.getMonth(), today.getFullYear(), parseInt(cmat[0].clsdDate.toString().substr(4,2)), parseInt(cmat[0].clsdDate.toString().substr(0,4))) * cmat[0].sp).toFixed(0))*100;
								tla[3] = '$' + comp1adj;
								tla[4] = monthlyChange + '%';
								var comp2adj = Math.floor(((monthlyChange * 0.01 * monthsDifference(today.getMonth(), today.getFullYear(), parseInt(cmat[1].clsdDate.toString().substr(4,2)), parseInt(cmat[1].clsdDate.toString().substr(0,4))) * cmat[1].sp).toFixed(0))/100)*100;
								tla[5] = '$' + comp2adj;
								tla[6] = monthlyChange + '%';
								var comp3adj = Math.floor((monthlyChange * 0.0001 * monthsDifference(today.getMonth(), today.getFullYear(), parseInt(cmat[2].clsdDate.toString().substr(4,2)), parseInt(cmat[2].clsdDate.toString().substr(0,4))) * cmat[2].sp).toFixed(0))*100;
								tla[7] = '$' + comp3adj;
								adjustments[0].push(comp1adj);
								adjustments[1].push(comp2adj);
								adjustments[2].push(comp3adj);
								finalArray.push(tla);
							}else if(i===6 || i===7 || i===8){//asp, lp, olp
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = '$' + withCommas(cmat[0][catarrlegend[i]].toString());
								tla[3] = '';
								tla[4] = '$' + withCommas(cmat[1][catarrlegend[i]].toString());
								tla[5] = '';
								tla[6] = '$' + withCommas(cmat[2][catarrlegend[i]].toString());
								tla[7] = '';
								finalArray.push(tla);
							}else if(i === 9){//sp/olp | sp/lp
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = ((100*cmat[0].sp)/cmat[0].olp).toFixed(2) + '% | ' + ((100*cmat[0].sp)/cmat[0].lp).toFixed(2) + '%';
								tla[3] = '';
								tla[4] = ((100*cmat[1].sp)/cmat[1].olp).toFixed(2) + '% | ' + ((100*cmat[1].sp)/cmat[1].lp).toFixed(2) + '%';
								tla[5] = '';
								tla[6] = ((100*cmat[2].sp)/cmat[2].olp).toFixed(2) + '% | ' + ((100*cmat[2].sp)/cmat[2].lp).toFixed(2) + '%';
								tla[7] = '';
								finalArray.push(tla);
							}else if(i === 15 || i === 16){//property taxes, assessments
								tla[0] = catArr[i];
								tla[1] = '$' + withCommas(rb[catarrlegend[i]].toString());
								tla[2] = '$' + withCommas(cmat[0][catarrlegend[i]].toString());
								tla[3] = '';
								tla[4] = '$' + withCommas(cmat[1][catarrlegend[i]].toString());
								tla[5] = '';
								tla[6] = '$' + withCommas(cmat[2][catarrlegend[i]].toString());
								tla[7] = '';
								finalArray.push(tla);
							}else if(i===21){//asf | source
								tla[0] = catArr[i];
								tla[1] = rb[catarrlegend[i]] + ' | self';
								tla[2] = cmat[0][catarrlegend[i]] + ' | ' + cmat[0].sfSource;
								tla[3] = '';
								tla[4] = cmat[1][catarrlegend[i]] + ' | ' + cmat[1].sfSource;
								tla[5] = '';
								tla[6] = cmat[2][catarrlegend[i]] + ' | ' + cmat[2].sfSource;
								tla[7] = '';
								finalArray.push(tla);
							}else if(i===28){//net Adjustments
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = '';
								tla[3] = '$' + withCommas(adjustments[0].reduce(getSum).toString());
								tla[4] = '';
								tla[5] = '$' + withCommas(adjustments[1].reduce(getSum).toString());
								tla[6] = '';
								tla[7] = '$' + withCommas(adjustments[2].reduce(getSum).toString());
								finalArray.push(tla);
							}else if(i===29){//Net Adjustments Percentage
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = '';
								tla[3] = parseFloat(100* adjustments[0].reduce(getSum) / cmat[0].sp).toFixed(2) + '%';
								tla[4] = '';
								tla[5] = parseFloat(100* adjustments[1].reduce(getSum) / cmat[1].sp).toFixed(2) + '%';
								tla[6] = '';
								tla[7] = parseFloat(100* adjustments[2].reduce(getSum) / cmat[2].sp).toFixed(2) + '%';
								finalArray.push(tla);
							}else if(i===30){//sp/asf
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = '$' + (cmat[0].sp / cmat[0].asf).toFixed(0) + '/sqft';
								tla[3] = '';
								tla[4] = '$' + (cmat[1].sp / cmat[1].asf).toFixed(0) + '/sqft';
								tla[5] = '';
								tla[6] = '$' + (cmat[2].sp / cmat[2].asf).toFixed(0) + '/sqft';
								tla[7] = '';
								finalArray.push(tla);
							}else if(i===31){// Adjusted sp/asf
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = '';
								tla[3] = '$' + ((cmat[0].sp + adjustments[0].reduce(getSum)) / cmat[0].asf).toFixed(0) + '/sqft';
								tla[4] = '';
								tla[5] = '$' + ((cmat[1].sp + adjustments[1].reduce(getSum)) / cmat[1].asf).toFixed(0) + '/sqft';
								tla[6] = '';
								tla[7] = '$' + ((cmat[2].sp + adjustments[2].reduce(getSum)) / cmat[2].asf).toFixed(0) + '/sqft';
								finalArray.push(tla);
							}else if(i===32){// Adjusted sp
								tla[0] = catArr[i];
								tla[1] = '';
								tla[2] = '';
								tla[3] = '$' + withCommas((cmat[0].sp + adjustments[0].reduce(getSum)).toFixed(0).toString());
								tla[4] = '';
								tla[5] = '$' + withCommas((cmat[1].sp + adjustments[1].reduce(getSum)).toString());
								tla[6] = '';
								tla[7] = '$' + withCommas((cmat[2].sp + adjustments[2].reduce(getSum)).toString());
								finalArray.push(tla);
							}else{
								tla[0] = catArr[i];
								tla[1] = rb[catarrlegend[i]];
								tla[2] = cmat[0][catarrlegend[i]];
								tla[3] = '';
								tla[4] = cmat[1][catarrlegend[i]];
								tla[5] = '';
								tla[6] = cmat[2][catarrlegend[i]];
								tla[7] = '';
								finalArray.push(tla);
							}
						}
					}

					allResults.push(finalArray, stats, info, compsSelected);
					//allResults.push(cmaMatches, doc, ranking, adjustments, stats, info);
					//console.log(cmat);
					response.send(allResults);
					//response.json(doc);
				}
			});
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

app.get('/api/find/userSearches', function(req, res){
	SearchesUser.find({})
	//.select('')
	.exec(function(err, doc){
		if(err){
			console.log('/api/find/userSearches error: ', error);
		}else{
			res.send(doc);
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