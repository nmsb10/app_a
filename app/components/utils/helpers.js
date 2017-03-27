// Include the axios package for performing HTTP requests (promise based alternative to request)
//https://github.com/mzabriskie/axios
var axios = require("axios");
//import * as axios from 'axios';

var helper = {
	//function to load tsv file contents to the database
	loadDB: function(tsvContents){
		console.log('tsvcontnets!', tsvContents);
		return axios.post('/load/tsv', tsvContents);
	},
	//function to get the addresses already input to the db
	getDbAddresses: function(){
		return axios.get('/api/find/addresses');
	},
	deleteAddresses: function(){
		return axios.post('/api/delete/addresses');
	}
};

// Export helper for use in various components
module.exports = helper;