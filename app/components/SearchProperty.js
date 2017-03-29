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
					clsdDate:'',
					propTax:'',
					asmDues:''
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
					clsdDate:'',
					propTax:'',
					asmDues:''
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
					clsdDate:'',
					propTax:'',
					asmDues:''
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
			},
			subjectProperty: {
				strNumber:'',
				address:'',
				typ:'',
				mlsNum: '',
				status: '',
				clsdDate:'',
				marketFA:'',
				sp:'',
				lp:'',
				olp:'',
				splpRatios:'',
				finType:'',
				distressed:'',
				contractDate:'',
				listDate:'',
				mt:'',
				propTax:'$0',
				asmDues:0,
				rms:0,
				bds:0,
				bathF:0,
				bathH:0,
				ASFandsource:'0 | self',
				exposure:'',
				PIN:'',
				adjUpdates:'',
				adjMechanicals:'',
				adjHW:'',
				adjPremLoc:'',
				netAdjustments:'',
				netAdjustmentsPerc:'',
				SPtoASF:'',
				adjSPtoASF:'',
				adjustedSalePrice:''
			},
			//categories array:
			catArr: [//!if you change anything here, must make same change to catarrlegent!!
				'address',
				'property type',
				'mls #',
				'status',
				'closed date',
				'appreciating / declining / stable market factor adjustment',
				'sold price',
				'list price',
				'original list price',
				'sp/olp | sp/lp',
				'financing type',
				'distressed?',
				'contract date',
				'list date',
				'market time',
				'property taxes',
				'assessments',
				'# rooms',
				'# bedrooms',
				'# full bathrooms',
				'# half bathrooms',
				'ASF & source',
				'exposure(s)',
				'PIN(s)',
				'updates adjustment',
				'mechanicals adjustment',
				'hw floors adjustment',
				'premium location adjustment',
				'Net Adjustments',
				'Net Adjustments %',
				'SP / ASF',
				'Adjusted SP / ASF',
				'Adjusted Sale Price'
			],
			//catarrlegend has the key value (for the individual properties) at the same index for the categories to go in the cma table
			catarrlegend: [
				'strNumber',
				'typ',
				'mlsNum',
				'status',
				'clsdDate',
				'marketFA',
				'sp',
				'lp',
				'olp',
				'splpRatios',
				'fin',
				'distressed',
				'contractDate',
				'listDate',
				'mt',
				'propTax',
				'asmDues',
				'rms',
				'bds',
				'bathF',
				'bathH',
				'ASFandsource',
				'exposure',
				'PIN',
				'adjUpdates',
				'adjMechanicals',
				'adjHW',
				'adjPremLoc',
				'netAdjustments',
				'netAdjustmentsPerc',
				'SPtoASF',
				'adjSPtoASF',
				'adjustedSalePrice'
			],
			bestCMA:[]
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
	// getAddresses(){
	// 	console.log('getAddresses function in searchproperty.js function called');
	// 	axios.get('/api/find/addresses').then(function(response){
	// 		if(response !== this.state.addressesLoaded){
	// 			this.setState({
	// 				addressesLoaded: response.data
	// 			});
	// 		}
	// 	}.bind(this));
	// }

getAddresses(){
		helper.getDbAddresses().then(function(response){
			if(response !== this.state.addressesLoaded){
				this.setState({
					addressesLoaded: response.data
				});
			}
		}.bind(this));
	}


	//data request methods
	searchProperty(propertyObj){		
		axios.post('/search', propertyObj).then(function(response){
			//after receiving the database data (an array of objects),
			//create the finalArray to send for mapping on cma results
			//here we are giving each of the first 3 properties arrays the
			//newKeys key values,
			//then currently setting those key values to foo, bar, baz
			var finalArray = [];
			var newKeys = [
				'marketFA',
				'splpRatios',
				'ASFandsource',
				'adjUpdates',
				'adjMechanicals',
				'adjHW',
				'adjPremLoc',
				'netAdjustments',
				'netAdjustmentsPerc',
				'SPtoASF',
				'adjSPtoASF',
				'adjustedSalePrice'
			];
			//cmat (cma material) represents the array of properties objects received from the database
			var cmat = response.data[0];
			//response.data[1] is the array of adjustments calculated by the server
			for(var k = 0; k< newKeys.length; k++){
				cmat[0][newKeys[k]] = "foo";
				cmat[1][newKeys[k]] = 'bar';
				cmat[2][newKeys[k]] = 'baz';
			}
			for(var i = 0; i<this.state.catArr.length; i++){
				//table line array
				var tla = [];
				if(i===2){
					tla[0] = this.state.catArr[i];
					tla[1] = this.state.subjectProperty[this.state.catarrlegend[i]];
					// tla[2] = '<a href = https://www.atproperties.com/' + response.data[0][this.state.catarrlegend[i]] + ' target = "_blank">' + response.data[0][this.state.catarrlegend[i]] +'</a>';
					tla[2] = cmat[0][this.state.catarrlegend[i]];
					tla[3] = cmat[1][this.state.catarrlegend[i]];
					tla[4] = 'bar';
					finalArray.push(tla);
				}else{
					tla[0] = this.state.catArr[i];
					tla[1] = this.state.subjectProperty[this.state.catarrlegend[i]];
					tla[2] = cmat[0][this.state.catarrlegend[i]];
					tla[3] = cmat[1][this.state.catarrlegend[i]];
					tla[4] = cmat[2][this.state.catarrlegend[i]];
					finalArray.push(tla);
				}
				
			}
			//now manipulate certain values here:
			//manipulate values here
			//ie create full address, add commas and $ to prices, taxes, assessments
			if(cmat.length>2){
				this.setState({
					bestCMA: finalArray
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
				<div className = 'top-statistics'>
					<SearchForm 
						searchPlease = {(submission) => this.searchProperty(submission)}
						updateCmaSp = {(input) => this.updateCmaSpFields(input)}
						defaultPropertyType = {'AT'}
					/>
					<div className = 'ts-third'>
					</div>
					<div className = 'ts-third'>
					</div>
				</div>
				<Cma res = {this.state.cmaResultsObj} cmar = {this.state.cmaResults} cma = {this.state.bestCMA}/>
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