import * as React from 'react';
import {SearchForm} from './SearchForm';
import {Cma} from './Cma';
import {TsvButtons} from './TsvButtons';
import * as axios from 'axios';
// import {helper} from './utils/helpers';
var helper = require('./utils/helpers.js');

class SearchProperty extends React.Component {
	//set initial state
	initializeState(){
		this.setState({
			addressesLoaded:[],
			cmaResults:[
				{
					typ:'',
					strNumber:'',
					compassPoint:'',
					strName:'',
					sfx:'',
					unit:'',
					mlsNum:'',
					status:'',
					olp:'',
					lp:'',
					sp:'',
					fin:'',
					listDate:'',
					contractDate:'',
					clsdDate:''
				},
				{
					typ:'',
					strNumber:'',
					compassPoint:'',
					streetName:'',
					sfx:'',
					unit:'',
					mlsNum:'',
					status:'',
					olp:'',
					lp:'',
					sp:'',
					fin:'',
					listDate:'',
					contractDate:'',
					clsdDate:''
				},
				{
					typ:'',
					strNumber:'',
					compassPoint:'',
					streetName:'',
					sfx:'',
					unit:'',
					mlsNum:'',
					status:'',
					olp:'',
					lp:'',
					sp:'',
					fin:'',
					listDate:'',
					contractDate:'',
					clsdDate:''
				},
			],
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
	}
	componentDidMount(){
		this.getAddresses();
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
	//getAddresses = function to get all addresses input to the database
	getAddresses(){
		console.log('getAddresses function in searchproperty.js function called');
		axios.get('/api/find/addresses').then(function(response){
			if(response !== this.props.loadedAddresses){
				this.setState({
					addressesLoaded: response.data
				});
			}
		}.bind(this));
	}
	//data request methods
	searchProperty(propertyObj){		
		axios.post('/search', propertyObj).then(function(response){
			console.log('response received in SearchProperty.js!', response.data);
			if(response.data.length>2){
				this.setState({
					cmaResults: response.data
				});
			}else{
				console.log('less than 3 CMA results received!');
			}
		}.bind(this));
		// .then(() => {
		// 	this.redirectToSearch();
		// })
		// .catch((error) => {
		// 	console.log('search didn\'t work. darn.');
		// });
	}
	render(){
		return(
			<div className = 'fit-95 searchPropertyComponent' >
				<SearchForm
					searchPlease = {(submission) => this.searchProperty(submission)}
					updateCmaSp = {(input) => this.updateCmaSpFields(input)}
					defaultPropertyType = {'AT'}
				/>
				<Cma res = {this.state.cmaResultsObj} cmar = {this.state.cmaResults}/>
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
				{/*
				<TsvButtons loadedAddresses = {this.state.addressesLoaded} getAddresses = {this.getAddresses}/>
				*/}
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