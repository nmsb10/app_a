var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSearchSchema = new Schema({
	AddressEntered: {
		type: String
	},
	searchDate:{
	    type: Date,
	    default: Date.now
	},
	type:{
		type: String
	},
	streetNumber:{
		type: String
	},
	streetName:{
		type: String
	},
	unit:{
		type: String
	},
	asf:{
		type: Number
	},
	assessments:{
		type: Number
	},
	taxes:{
		type: Number
	},
	bedrooms:{
		type: Number
	},
	bathrooms:{
		type: Number
	}
});

var SearchesUser = mongoose.model("SearchesUser", UserSearchSchema);
module.exports = SearchesUser;