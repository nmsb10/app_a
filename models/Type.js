var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
	//http://stackoverflow.com/questions/8737082/mongoose-schema-within-schema
	//ARRAY OR OBJECT???
	de: [{
		// Store ObjectIds in the array
		type: Schema.Types.ObjectId,
		// The ObjectIds will refer to the ids in the Property model
		ref: "Property"
	}],
	at: {
		// Store ObjectIds in the array
		type: Schema.Types.ObjectId,
		// The ObjectIds will refer to the ids in the Property model
		ref: "Property"
	}
});

var Type = mongoose.model("Type", TypeSchema);
module.exports = Type;

//http://blogs.wfmt.com/pianoforte/2014/10/03/yiming-zhang-piano/
//http://blogs.wfmt.com/pianoforte/2013/05/03/david-kalhous/