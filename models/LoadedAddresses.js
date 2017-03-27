var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LdAdSchema = new Schema({
	Address: {
		type: String
	},
	createdDate:{
	    type: Date,
	    default: Date.now
	},
});

var LoadedAddresses = mongoose.model("LoadedAddresses", LdAdSchema);
module.exports = LoadedAddresses;