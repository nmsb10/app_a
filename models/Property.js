var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
	title: {
		type: String
	},
	pubDate: {
		type: String
	},
	url: {
		type: String
	},
	code:{
		type: String
	},
	date:{
		type: Date
	},
	createdDate:{
	    type: Date,
	    default: Date.now
	  },
});

var Property = mongoose.model("Property", PropertySchema);
module.exports = Property;