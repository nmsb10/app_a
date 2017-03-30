import * as React from 'react';
import {SearchForm} from './SearchForm';
import {BuildingStatistics} from './BuildingStatistics';
import {BuildingInfo} from './BuildingInfo';
import {Cma} from './Cma';
import {TsvButtons} from './TsvButtons';
import * as axios from 'axios';
// import {helper} from './utils/helpers';
var helper = require('./utils/helpers.js');

class SearchProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
				strName:'',
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
				asf:'',
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
			bestCMA:[],
			noResultsMes:'',
			buildStats:{

			},
			buildInfo:{

			}
		};
		this.updateCmaSpFields = this.updateCmaSpFields.bind(this);
		this.updateSPFields = this.updateSPFields.bind(this);
		this.searchProperty = this.searchProperty.bind(this);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
	}	
	redirectToSearch(){
		//'search' is the Route path from routes.js
		this.context.router.push('search');
	}
	updateCmaSpFields(input){
		let {cmaResultsObj} = this.state;
		//when you want to update an object from this.state
		let newObjCopy = Object.assign({}, cmaResultsObj, {sp: input});
		this.setState({
			cmaResultsObj: newObjCopy
		});
	}
	updateSPFields(input){
		// let newState = {};
		// newState[event.target.id] = event.target.value;
		//this.setState(newState);
		console.log(input);
	}
	//data request methods
	searchProperty(propertyObj){
		//set the subject property array data to what the user submitted
		let {
			subjectProperty,
			catArr,
			catarrlegend
		} = this.state;
		//merging into an empty object, this.state.subjectProperty, and the propertyObject from the search!
		let spObjectCopy = Object.assign({}, subjectProperty, propertyObj);
		this.setState({
			subjectProperty: spObjectCopy
		});
		axios.post('/search', propertyObj).then(function(response){
			//after receiving the database data (an array of three arrays),
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
			var ranking = response.data[1];
			var adjustments = response.data[2];
			var bstats = response.data[3];
			var binfo = response.data[4];
			if(cmat.length > 2){
				var fbb = ['foo', 'bar', 'baz'];
				for(var k = 0; k< newKeys.length; k++){
					cmat[0][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
					cmat[1][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
					cmat[2][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
				}
				for(var i = 0; i<catArr.length; i++){
					//table line array (table row)
					var tla = [];
					if(i===2){
						tla[0] = catArr[i];
						tla[1] = this.state.subjectProperty[catarrlegend[i]];
						// tla[2] = '<a href = https://www.atproperties.com/' + response.data[0][this.state.catarrlegend[i]] + ' target = "_blank">' + response.data[0][this.state.catarrlegend[i]] +'</a>';
						tla[2] = cmat[0][catarrlegend[i]];
						tla[3] = cmat[1][catarrlegend[i]];
						tla[4] = 'tada!test';
						finalArray.push(tla);
					}else{
						tla[0] = catArr[i];
						tla[1] = this.state.subjectProperty[catarrlegend[i]];
						tla[2] = cmat[0][catarrlegend[i]];
						tla[3] = cmat[1][catarrlegend[i]];
						tla[4] = cmat[2][catarrlegend[i]];
						finalArray.push(tla);
					}
				}
				//manipulate values here
				//ie create full address, add commas and $ to prices, taxes, assessments
				this.setState({
					bestCMA: finalArray,
					noResultsMes:'',
					buildStats: bstats,
					buildInfo: binfo
				});
			}else{
				this.setState({
					noResultsMes: 'no results found. please try again.',
					bestCMA: [],
					buildStats: bstats,
					buildInfo: binfo
				});
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
		let {
			noResultsMes,
			cmaResultsObj,
			bestCMA,
			buildStats,
			buildInfo
		} = this.state;
		return(
			<div className = 'fit-95 searchPropertyComponent' >
				<div className = 'user-nav'>welcome! username placeholder.</div>
				<div className = 'top-statistics'>
					<SearchForm 
						searchPlease = {(submission) => this.searchProperty(submission)}
						updateCmaSp = {(input) => this.updateCmaSpFields(input)}
						updateSpFields = {(input) => this.updateSpFields(input)}
						defaultPropertyType = {'AT'}
						noResultsMessage = {noResultsMes}
					/>
					<BuildingStatistics stat = {buildStats}/>
					<BuildingInfo info = {buildInfo}/>
				</div>
				<Cma 
					res = {cmaResultsObj} 
					cma = {bestCMA}
				/>
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