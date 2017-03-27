import * as React from 'react';
import {SearchForm} from './SearchForm';
import {Cma} from './Cma';
import * as d3 from 'd3';//https://www.npmjs.com/package/d3
import * as axios from 'axios';
// import {helper} from './utils/helpers';
var helper = require('./utils/helpers.js');

class SearchProperty extends React.Component {
	//set initial state
	initializeState(){
		this.setState({
			loadedDB: false,
			tsvFiles: ['159ewalton.TSV', '800nmichigan.TSV', '161echicago.TSV', '474nlsd.TSV'],
			addressesLoaded:[],
			cmaResults:[],
			cmaResultsObj: {
				//sp = subject property	
				sp: {
					propertyType: '',
					streetNumber: '',
					streetName: '',
					unitNumber:'',
					squareFeet:'',
					asm:'',
					taxes:'',
					br: '',
					baF: ''
				},
				comps: []
			}
		});
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
		this.initializeState();
		console.log('props:', this.props);
	}
	componentDidMount(){
		this.getAddresses();
	}
	loadDB(){
		//http://stackoverflow.com/questions/16177037/how-to-extract-information-in-a-tsv-file-and-save-it-in-an-array-in-javascript
		//https://github.com/d3/d3-request
		//http://learnjsdata.com/read_data.html
		//nb: The d3.tsv method makes an AJAX request for data.
		//http://learnjsdata.com/read_data.html
		if(!this.state.loadedDB){
			this.setState({
				loadedDB: true
			});			
			var q = d3.queue();
			for(var i = 0; i < this.state.tsvFiles.length; i++) {
				q.defer(d3.tsv,'/tsv/'+ this.state.tsvFiles[i]);
			}
			// q.await(this.analyze);
			q.awaitAll(this.sendAllTsv);
		}else{
			console.log('loaded the tsv files already');
		}
	}
	getTSVFormatted(){
		for(var i = 0; i<this.state.tsvFiles.length; i++){
			d3.tsv('/tsv/'+this.state.tsvFiles[i], this.postTSVData());
		}
	}
	postTSVData(data){
		var error = false;
		if(error){
			console.log('postTSVData error: ', error);
		}else{
			console.log('posttsvData:', data);
			return axios.post('/load/tsv', data);
		}
	}
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
	sendAllTsv(error, results){
		if(error){
			console.log(error);
		}else{
			console.log(results);
			//results is an array of arrays
			results.forEach(function(item){
				return axios.post('/load/tsv', item);
			});
		}
	}
	getAddresses(){
		helper.getDbAddresses().then(function(response){
			if(response !== this.state.addressesLoaded){
				this.setState({
					addressesLoaded: response.data
				});
			}
		}.bind(this));
	}
	redirectToSearch(){
		//'search' is the Route path from routes.js
		this.context.router.push('search');
	}
	updateCmaSpFields(input){
		let {cmaResultsObj} = this.state;
		let newObjCopy = Object.assign({}, cmaResultsObj, {sp: input});
		this.setState({
			cmaResultsObj: newObjCopy
		});
	}
	//data request methods
	searchProperty(propertyObj){		
		axios.post('/search', propertyObj).then(function(response){
			console.log('response received in SearchProperty.js!', response.data);
		});
			// .then(() => {
			// 	this.redirectToSearch();
			// })
			// .catch((error) => {
			// 	console.log('search didn\'t work. darn.');
			// });
	}
	render(){
		const handleLoadDBTSV = (event) => {
			event.preventDefault();
			this.loadDB();
		}
		const deleteAllAddresses = (event) => {
			event.preventDefault();
			helper.deleteAddresses();
			this.getAddresses();
		}
		return(
			<div className = 'fit-95 searchPropertyComponent' >
				<SearchForm
					searchPlease = {(submission) => this.searchProperty(submission)}
					updateCmaSp = {(input) => this.updateCmaSpFields(input)}
					defaultPropertyType = {'AT'}
				/>
				<form role="form" onSubmit={deleteAllAddresses}>
					<div className="">
						<input type="hidden" data-articleid='' name=""/>
					</div>
					<button type="submit" className="btn-admin">delete addresses</button>
				</form>
				<Cma res = {this.state.cmaResultsObj}/>
				{/*This panel will hold the resulting addresses input to the database already
				Address and createdDate*/}
				<div className="">
					{this.state.addressesLoaded.map(function(elem, i) {
						return (
							<div key = {i} className = ''>
								<span>{elem.Address} added on {elem.createdDate}</span>
							</div>
						);
					{/*VERY IMPORTANT: INCLUDE `THIS` HERE SO YOU CAN PASS FUNCTIONS FROM THIS RESULTS.JS COMPONENT TO ELEMENTS WITHIN THIS MAPPING OF THE articlesFound ARRAY*/}
					},this)}
				</div>
				<form role="form" onSubmit={handleLoadDBTSV}>
					<div className="">
						<input type="hidden" data-articleid='' name=""/>
					</div>
					<button type="submit" className="btn-admin">load database</button>
				</form>
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
SearchProperty.contextTypes = {
	router: React.PropTypes.any
};

export { SearchProperty};