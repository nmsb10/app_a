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