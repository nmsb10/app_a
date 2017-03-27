var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
	TYP: {//'AT' or 'DE'
		type: String
	},
	Street_Number: {//Street #
		type: String
	},
	Str_Name: {
		type: String
	},
	Unit: {//Unit #
		type: String
	},
	Zip: {
		type: String
	},
	MLS_Number: {
		type: String
	},
	PIN: {
		type: String
	},
	Stat: {//CLSD ACTV
		type: String
	},
	Sold_Pr: {
		type: String
	},
	List_Price:{
		type: String
	},
	Orig_List_Pr: {
		type: String
	},
	Off_Mkt_Dt:{
		type: String
	},
	Contract_Date:{
		type: String
	},
	Closed_Date:{
		type: String
	},
	MT:{//market time
		type: String
	},
	Remarks: {
		type: String
	},
	ASF: {//approximate square feet
		type: String
	},
	Num_Rms: {//# Rms
		type: String
	},
	All_Beds: {
		type: String
	},
	Baths_Full: {//#_Full_Baths
		type: String
	},
	Baths_Half: {//#_Half_Baths
		type: String
	},
	Exposure:{//could be "N (North), E (East), W (West)"
		type: String
	},
	As_Asc_Dues:{
		type: Date
	},
	Taxes:{
		type: Date
	},
	Flr_MB:{//Mast Bd Flr
		type: String
	},
	Flr_BR2:{//2nd_Bdr_Flr
		type: String
	},
	Flr_BR3:{//3rd_Bdr_Flr
		type: String
	},
	Flr_BR4:{//4th_Bdr_Flr
		type: String
	},
	Flr_Kit:{//Kit Flr
		type: String
	},
	Flr_Lr:{//Liv Rm Flr
		type: String
	},
	Flr_Din:{//Din Flr
		type: String
	},
	Flr_Fam:{//Fam Rm Flr
		type: String
	},
	Garage_Spaces:{//#GSp
		type: String
	},
	Prk_Inc:{//Is Parking Included In Price?
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