var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//should add validation!
//http://mongoosejs.com/docs/validation.html
var PropertySchema = new Schema({
	// _propertyType : {
	// 	type: Number,
	// 	ref: 'PropertyType'
	// },
	typ: {// TYP: 'AT' or 'DE'
		type: String
	},
	compassPoint: {// CP: 'E',
		type: String
	},
	strNumber: {// Street #': '159',
		type: String
	},
	strName: {//'Str Name': 'Walton',
		type: String
	},
	sfx: {//Sfx: 'PL',
		type: String
	},
	unit: {//'Unit #': '15A',
		type: String
	},
	city: {//City: 'Chicago',
		type: String
	},
	state: {//State: 'Illinois',
		type: String
	},
	zip: {//Zip: '60611',
		type: String
	},  
	area: {//Area: '8008',
		type: String
	},
	county: {//County: 'Cook',
		type: String
	},
	subdiv: {//Subdivision: '',
		type: String
	},
	gschDist: {//'GS Dist': '299',
		type: String
	},
	hsDist: {//'HS Dist': '299',
		type: String
	},
	totalUnits: {//'Tot # Units': '102',
		type: String
	},
	typeDEAT: {//'Type DE/AT': 'Condo, High Rise (7+ Stories), Vintage',
		type: String
	},
	stories: {//'# Stories': '37',
		type: Number
	},
	yrBlt: {//'Yr Blt': '1929',
		type: String
	},
	mlsNum: {//'MLS #': '08933387',
		type: String
	},
	status: {//Stat: 'CLSD',
		type: String
	},
	contingency: {//Contingency: '',
		type: String
	},
	olp: {//'Orig List Pr': '2525000',
		type: Number
	},
	searchPrice: {//'LP/SP': '2350000',
		type: Number
	},
	sp: {//'Sold Pr': '2350000',
		type: Number
	},
	lp: {//'List Price': '2525000',
		type: Number
	},
	fin: {//FIN: 'Conventional',
		type: String
	},
	distressed: {//'Short Sale/Foreclosed/Court Approved': 'N/A',
		type: String
	},
	splp: {//'SP:LP': '93%',
		type: String
	},
	spolp: {//'SP:OLP': '93%',
		type: String
	},
	mt: {//MT: '176',
		type: Number
	},
	lmt: {//LMT: '49',
		type: Number
	},
	PIN: {//PIN: '17032130201031',
		type: String
	},
	multiPIN: {//'Mult PINs': '',
		type: String
	},
	addTaxInfo: {//'Addl Tax Info': '',
		type: String
	},
	commonPerctg: {//'% Common': '',
		type: String
	},
	propTax:{//Taxes: '8997.54' || 'NEW' || 'EXEMPT'
		type: Schema.Types.Mixed
	},
	taxExemps:{//'Tax Exemps': 'None',
		type: String
	},
	taxYear:{//'Tax Year': '2013',
		type: String
	},
	asmDues:{//'As/Asc Dues': '2609',
		type: Number
	},
	maf:{//MAF: 'No',
		type: String
	},
	mafAmount:{//'Master Association Fee($)': '',
		type: Number
	},
	spAssess:{//'Spec Assess': 'No',
		type: String
	},
	ssa:{//'Special Service Area': 'No',
		type: String
	},
	ssaFee:{//'Special Service Area Fee': '',
		type: Number
	},
	unitFl:{//'Unit Fl No': '15',
		type: String
	},
	model:{//Model: '',
		type: String
	},
	asf:{//ASF: '2832',
		type: Number
	},
	sfSource:{//'SF Source': 'Estimated',
		type: String
	},
	totalSF:{//'Total SF': '',
		type: Number
	},
	mainSF:{//'Main SF': '',
		type: Number
	},
	aprxTFSF:{//'Aprx Total Fin SF': '',
		type: Number
	}, 
	exposure:{//Exposure: 'N (North), E (East), W (West), City, Lake/Water',
		type: String
	},
	rms:{//'# Rms': '6',
		type: Number
	},
	bds:{//Beds: '3',
		type: Number
	},
	allBeds:{//'All Beds': '3',
		type: Number
	},
	bsmtBeds:{//'Bsmt. Beds': '0',
		type: Number
	},
	bathF:{//'# Full Baths': '3',
		type: Number
	},
	bathH:{//'# Half Baths': '1',
		type: Number
	},
	bathsTotal:{//Baths: '3.1',
		type: String
	},
	fpInt:{//'# Interior Fireplaces': '',
		type: Number
	},
	garageSpaces:{//'#GSp': '2',
		type: Number
	},
	garageType:{//'Garage Type': 'Attached',
		type: String
	},
	bsmt:{//Bsmt: 'None',
		type: String
	},
	bsmtDesc:{//'Basement Description': 'None',
		type: String
	},
	remarks:{//Remarks: 'Gorgeous home at the Palmolive w/outstanding lake...
		type: String
	},
	agentRemarks:{//'Agent Remarks': 'Floor plans under additional information',
		type: String
	},
	numParkingSpaces:{//'# Parking Spaces': '',
		type: Number
	},
	acDesc:{//Air: 'Central Air',
		type: String
	},
	heatDesc:{//'Heat/Fuel': 'Forced Air, Hot Water/Steam',
		type: String
	},
	aag:{//AAG: '',
		type: String
	},
	ipf:{//'Interior Property Features': 'Hardwood Floors, Laundry Hook-Up in Unit',
		type: String
	},
	parkingIncluded:{//'Is Parking Included in Price?': 'Yes',
		type: String
	},
	appliances:{//Appliances: 'Oven/Range, Microwave, Dishwasher, Refrigerator, High End Refrigerator, Washer, Dryer',
		type: String
	},
	amenities:{//Amen: '',
		type: String
	},
	commonAA:{//'Com Ar Amen': 'Bike Room/Bike Trails, Door Person, Elevator,...
		type: String
	},
	assesInc:{//'Asses Incl': 'Heat, Air Conditioning, Water, Gas, ...
		type: String
	},
	managementCo:{//'Management Company': 'Draper & Kramer',
		type: String
	},
	managementContactName:{//'Management Contact Name': 'Lynn Stephens',
		type: String
	},
	managementPhone:{//'Management Phone': '(312) 255-0159',
		type: String
	},
	oop:{//'% Own Occ': '',
		type: String
	},
	rentable:{//'Can Owner Rent': '',
		type: String
	},
	parkingFee:{//'Parking Fee/Lease $': '',
		type: Number
	},
	bd2Flr:{//'2nd Bdr Flr': 'Hardwood',
		type: String
	},
	bd3Flr:{//'3rd Bdr Flr': 'Hardwood',
		type: String
	},
	bd4Flr:{//'4th Bdr Flr': '',
		type: String
	},
	deededGarageCost:{//'Deeded Garage Cost': '',
		type: Number
	},
	deededParkingCost:{//'Deeded Parking Cost': '',
		type: Number
	},
	dinFlr:{//'Din Flr': 'Hardwood',
		type: String
	},
	equip:{//Equipment: '',
		type: String
	},
	famRmFlr:{//'Fam Rm Flr': '',
		type: String
	},
	kitFlr:{//'Kit Flr': '',
		type: String
	},
	lrFlr:{//'Liv Rm Flr': 'Hardwood',
		type: String
	},
	mbdBa:{//'Mast Bd Bth': 'Full',
		type: String
	},
	mbdFlr:{//'Mast Bd Flr': 'Hardwood',
		type: String
	},
	bd2Sz:{//'2nd Bdr Sz': '19X13',
		type: Array
	},
	bd3Sz:{//'3rd Bdr Sz': '15X14',
		type: Array
	},
	bd4Sz:{//'4th Bdr Sz': '',
		type: Array
	},
	mbdSz:{//'Mast Br Sz': '19X15',
		type: Array
	},
	lrSz:{//'Liv Rm Sz': '32X13',
		type: Array
	},
	kitSz:{//'Kit Sz': '13X10',
		type: Array
	},
	frSz:{//'Fam Rm Sz': '',
		type: Array
	}, 
	drSz:{//'Din Sz': '17X11',
		type: Array
	},
	addRms:{//'Additional Rooms': 'Foyer',
		type: String
	},
	baAmen:{//'Bth Amen': 'Whirlpool, Separate Shower, Double Sink',
		type: String
	},
	drDesc:{//'Din Rm': 'Separate',
		type: String
	},
	extPropFeat:{//'Exterior Property Features': '',
		type: String
	},
	listDate:{//'List Date': '05/26/2015',
		type: Number
	},
	contractDate:{//'Contract Date': '07/13/2015',
		type: Number
	},
	offMktDate:{//'Off Mkt Dt': '07/13/2015', (eg for temp status or else contract date)
		type: Number
	},
	clsdDate:{//'Closed Date': '08/11/2015',
		type: Number
	},
	acreage:{//Acreage: '' },
		type: String
	},
	createdDate:{
	    type: Date,
	    default: Date.now
	},
});

var Property = mongoose.model("Property", PropertySchema);
module.exports = Property;

  // { TYP: 'AT',
  //   'Street #': '159',
  //   CP: 'E',
  //   'Str Name': 'Walton',
  //   Sfx: 'PL',
  //   'Unit #': '15A',
  //   City: 'Chicago',
  //   State: 'Illinois',
  //   Zip: '60611',
  //   Area: '8008',
  //   County: 'Cook',
  //   Subdivision: '',
  //   'GS Dist': '299',
  //   'HS Dist': '299',
  //   'Tot # Units': '102',
  //   'Type DE/AT': 'Condo, High Rise (7+ Stories), Vintage',
  //   '# Stories': '37',
  //   'Yr Blt': '1929',
  //   'MLS #': '08933387',
  //   Stat: 'CLSD',
  //   Contingency: '',
  //   'Orig List Pr': '2525000',
  //   'LP/SP': '2350000',
  //   'Sold Pr': '2350000',
  //   'List Price': '2525000',
  //   FIN: 'Conventional',
  //   'Short Sale/Foreclosed/Court Approved': 'N/A',
  //   'SP:LP': '93%',
  //   'SP:OLP': '93%',
  //   MT: '176',
  //   LMT: '49',
  //   PIN: '17032130201031',
  //   'Mult PINs': '',
  //   'Addl Tax Info': '',
  //   '% Common': '',
  //   Taxes: '8997.54',
  //   'Tax Exemps': 'None',
  //   'Tax Year': '2013',
  //   'As/Asc Dues': '2609',
  //   MAF: 'No',
  //   'Master Association Fee($)': '',
  //   'Spec Assess': 'No',
  //   'Special Service Area': 'No',
  //   'Special Service Area Fee': '',
  //   'Unit Fl No': '15',
  //   Model: '',
  //   ASF: '2832',
  //   'SF Source': 'Estimated',
  //   'Total SF': '',
  //   'Main SF': '',
  //   'Aprx Total Fin SF': '',
  //   Exposure: 'N (North), E (East), W (West), City, Lake/Water',
  //   '# Rms': '6',
  //   Beds: '3',
  //   'All Beds': '3',
  //   'Bsmt. Beds': '0',
  //   '# Full Baths': '3',
  //   '# Half Baths': '1',
  //   Baths: '3.1',
  //   '# Interior Fireplaces': '',
  //   '#GSp': '2',
  //   'Garage Type': 'Attached',
  //   Bsmt: 'None',
  //   'Basement Description': 'None',
  //   Remarks: 'Gorgeous home at the Palmolive w/outstanding lake & city views from every rm. Beautiful trim & moulding thruout. Grand foyer w/dbl walnut drs & herringbone flrs. Expansive liv & din spcs & higher than the Drake w/lake vws. Sleek kit w/fab appls & great strg. Luxe mstr ste w/lg clst spc & sumptuous mrbl ba. 2 addtl br’s-1 ensuite, ldry rm, & pwdr rm. Full amenity bldg w/24hr dr staff, spa, & fitness cntr. 2car pkg.',
  //   'Agent Remarks': 'Floor plans under additional information',
  //   '# Parking Spaces': '',
  //   Air: 'Central Air',
  //   'Heat/Fuel': 'Forced Air, Hot Water/Steam',
  //   AAG: '',
  //   'Interior Property Features': 'Hardwood Floors, Laundry Hook-Up in Unit',
  //   'Is Parking Included in Price?': 'Yes',
  //   Appliances: 'Oven/Range, Microwave, Dishwasher, Refrigerator, High End Refrigerator, Washer, Dryer',
  //   Amen: '',
  //   'Com Ar Amen': 'Bike Room/Bike Trails, Door Person, Elevator, Exercise Room, Storage, Health Club, On Site Manager/Engineer, Service Elevator, Steam Room, Valet/Cleaner, Whirlpool',
  //   'Asses Incl': 'Heat, Air Conditioning, Water, Gas, Common Insurance, Doorman, TV/Cable, Exercise Facilities, Scavenger, Snow Removal',
  //   'Management Company': 'Draper & Kramer',
  //   'Management Contact Name': 'Lynn Stephens',
  //   'Management Phone': '(312) 255-0159',
  //   '% Own Occ': '',
  //   'Can Owner Rent': '',
  //   'Parking Fee/Lease $': '',
  //   '2nd Bdr Flr': 'Hardwood',
  //   '3rd Bdr Flr': 'Hardwood',
  //   '4th Bdr Flr': '',
  //   'Deeded Garage Cost': '',
  //   'Deeded Parking Cost': '',
  //   'Din Flr': 'Hardwood',
  //   Equipment: '',
  //   'Fam Rm Flr': '',
  //   'Kit Flr': '',
  //   'Liv Rm Flr': 'Hardwood',
  //   'Mast Bd Bth': 'Full',
  //   'Mast Bd Flr': 'Hardwood',
  //   '2nd Bdr Sz': '19X13',
  //   '3rd Bdr Sz': '15X14',
  //   '4th Bdr Sz': '',
  //   'Mast Br Sz': '19X15',
  //   'Liv Rm Sz': '32X13',
  //   'Kit Sz': '13X10',
  //   'Fam Rm Sz': '',
  //   'Din Sz': '17X11',
  //   'Additional Rooms': 'Foyer',
  //   'Bth Amen': 'Whirlpool, Separate Shower, Double Sink',
  //   'Din Rm': 'Separate',
  //   'Exterior Property Features': '',
  //   'List Date': '05/26/2015',
  //   'Contract Date': '07/13/2015',
  //   'Off Mkt Dt': '07/13/2015',
  //   'Closed Date': '08/11/2015',
  //   Acreage: '' },