var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
	//http://stackoverflow.com/questions/8737082/mongoose-schema-within-schema
	//http://mongoosejs.com/docs/populate.html
	de: [{
		// Store ObjectIds in the array
		type: Schema.Types.ObjectId,
		// The ObjectIds will refer to the ids in the Property model
		ref: "Property"
	}],
	at: {
		type: Schema.Types.ObjectId,
		ref: "Property"
	}
});

var PropertyType = mongoose.model("PropertyType", TypeSchema);
module.exports = PropertyType;

//http://mongoosejs.com/docs/populate.html
//http://mongoosejs.com/docs/schematypes.html
//http://stackoverflow.com/questions/36348369/how-to-structure-mongoose-schema-within-a-schema

//http://mongoosejs.com/docs/queries.html