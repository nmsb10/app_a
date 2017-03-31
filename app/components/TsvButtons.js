import * as React from 'react';
import * as d3 from 'd3';//https://www.npmjs.com/package/d3
import * as axios from 'axios';
var helper = require('./utils/helpers.js');

class TsvButtons extends React.Component {
	initializeState(){
		this.setState({
			loadedDB: false,
			aaagood2tsvFiles: ['159ewalton.TSV', '161echicago.TSV', '175edelaware.TSV', '400erandolph.TSV'],
			aaagood1tsvFiles: ['800nmichigan.TSV', '840nlsd.TSV', '950nmichigan.TSV','222epearson.TSV','401nwabash.TSV'],
			BADtsvFiles:[ '250epearson.TSV', '1000nlsd.TSV', '1235sprairie.TSV'],
			aaagood3tsvFiles: ['474nlsd.TSV', '505nlsd.TSV','1720mapleevanston.TSV', '807davisevanston.TSV', '655wirvingpark.TSV'],
			aaagood4tsvFiles: ['180epearson.TSV', '545ndearborn.TSV'],
			bbbgood1tsvFiles:['1201sprairie.TSV'],
			bbbgood2tsvFiles: ['1212nlasalle.TSV', '1250nlasalle.TSV'],
			bbbgood3tsvFiles:['1255nsandburg.TSV', '1355nsandburg.TSV','1360nsandburg.TSV'],
			bbbgood4tsvFiles:['1455nsandburg.TSV', '1460nsandburg.TSV'],
			bbbgood5tsvFiles:['1560nsandburg.TSV'],
			cccgood1tsvFiles: ['1211sprairie.TSV']
		});
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
		this.initializeState();
	}
	loadDB(fileName){
		//http://stackoverflow.com/questions/16177037/how-to-extract-information-in-a-tsv-file-and-save-it-in-an-array-in-javascript
		//https://github.com/d3/d3-request
		//http://learnjsdata.com/read_data.html
		//nb: The d3.tsv method makes an AJAX request for data.
		//http://learnjsdata.com/read_data.html
		switch(fileName){
			case 't1':	
				var q = d3.queue();
				for(var i = 0; i < this.state.good1tsvFiles.length; i++) {
					q.defer(d3.tsv,'/tsv/'+ this.state.good1tsvFiles[i]);
				}
				q.awaitAll(this.sendAllTsv);
				break;
			case 't2':
				var e = d3.queue();
				for(var j = 0; j < this.state.good2tsvFiles.length; j++) {
					e.defer(d3.tsv,'/tsv/'+ this.state.good2tsvFiles[j]);
				}
				e.awaitAll(this.sendAllTsv);
				break;
			case 't3':
				var f = d3.queue();
				for(var h = 0; h < this.state.good3tsvFiles.length; h++) {
					f.defer(d3.tsv,'/tsv/'+ this.state.good3tsvFiles[h]);
				}
				f.awaitAll(this.sendAllTsv);
				break;
			default:
				console.log('file requested not found.');
				break;
		}
		// if(!this.state.loadedDB){
		// 	this.setState({
		// 		loadedDB: true
		// 	});			
		// 	var q = d3.queue();
		// 	for(var i = 0; i < this.state.tsvFiles.length; i++) {
		// 		q.defer(d3.tsv,'/tsv/'+ this.state.tsvFiles[i]);
		// 	}
		// 	// q.await(this.analyze);
		// 	q.awaitAll(this.sendAllTsv);
		// }else{
		// 	console.log('loaded the tsv files already DURING THIS TSVBUTTONS COMPONENT MOUNT');
		// }
	}
	sendAllTsv(error, results){
		if(error){
			console.log(error);
		}else{
			//results is an array of arrays
			results.forEach(function(item){
				return axios.post('/load/tsv', item);
			});
		}
	}
	//former method before created the sendAllTsv function which can take in unlimited results
	//this analyze function requires you to have the same number of parameters as files you qeued
	analyze(error, tsvFileOne, tsvFileTwo){
		if(error){
			console.log(error);
		}else{
			//console.log(tsvFileOne);
			//console.log(tsvFileTwo);
			var allData = tsvFileOne.concat(tsvFileTwo);
			helper.loadDB(allData);
		}
	}
	// // former functions used to send the selected tsvFiles to the server
	// getTSVFormatted(){
	// 	for(var i = 0; i<this.state.tsvFiles.length; i++){
	// 		d3.tsv('/tsv/'+this.state.tsvFiles[i], this.postTSVData());
	// 	}
	// }
	// postTSVData(data){
	// 	var error = false;
	// 	if(error){
	// 		console.log('postTSVData error: ', error);
	// 	}else{
	// 		console.log('posttsvData:', data);
	// 		return axios.post('/load/tsv', data);
	// 	}
	// }
	render(){
		const handleLoadDBTSV = (event) => {
			event.preventDefault();
			console.log(event.target.kale.dataset.articleid);
			this.loadDB(event.target.kale.dataset.articleid);
		}
		const deleteAllAddresses = (event) => {
			event.preventDefault();
			helper.deleteModelContents('loadedAd');
			this.props.getAddresses();
		}
		const deleteAllProperties = (event) => {
			event.preventDefault();
			helper.deleteModelContents('allProperties');
		}
		return(
			<div className = '' >
				<form role="form" onSubmit={deleteAllAddresses}>
					<div className="">
						<input type="hidden" data-articleid='' name=""/>
					</div>
					<button type="submit" className="btn-admin">delete addresses</button>
				</form>
				<form role="form" onSubmit={deleteAllProperties}>
					<div className="">
						<input type="hidden" data-articleid='' name=""/>
					</div>
					<button type="submit" className="btn-admin">delete PROPERTIES</button>
				</form>
				<form role="form" onSubmit={handleLoadDBTSV}>
					<div className="">
						<input type="hidden" data-articleid='t1' name="kale"/>
					</div>
					<button type="submit" className="btn-admin">load database 1</button>
				</form>
				<form role="form" onSubmit={handleLoadDBTSV}>
					<div className="">
						<input type="hidden" data-articleid='t2' name="kale"/>
					</div>
					<button type="submit" className="btn-admin">load database 2</button>
				</form>
				<form role="form" onSubmit={handleLoadDBTSV}>
					<div className="">
						<input type="hidden" data-articleid='t3' name="kale"/>
					</div>
					<button type="submit" className="btn-admin">load database 3</button>
				</form>
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
TsvButtons.contextTypes = {
	router: React.PropTypes.any
};

export {TsvButtons};