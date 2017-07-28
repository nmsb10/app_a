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
});

var SearchesUser = mongoose.model("SearchesUser", UserSearchSchema);
module.exports = SearchesUser;