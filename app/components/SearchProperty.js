import * as React from 'react';
import {Link} from 'react-router';
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
		this.withCommas = this.withCommas.bind(this);
		this.state = {
			onView: 'search',//while searching on search form, is 'search'. otherwise 'loading'. after loading, if results are found, is 'stats' to show stats
			failText: null,
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
				rms:'',
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
				adjustedSalePrice:'',
				typ:'AT',
				strNumber: '',
				strName: '',
				unit:'',
				asf:'',
				asmDues:'',
				propTax:'',
				bds: '',
				bathF: ''
			},
			//categories array:
			catArr: [//!if you change anything here, must make same change to catarrlegent!!
				'address',
				'property type',
				'mls #',
				'status',
				'closed date',
				'appreciating / declining market adjustment',
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
				'Adjusted Sale Price',
				'Confidence Score'
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
				'asf',
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
				'adjustedSalePrice',
				'confidence'
			],
			fillerObject: {
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
				rms:'',
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
				adjustedSalePrice:'',
				typ:'AT',
				strNumber: '',
				strName: '',
				unit:'',
				asf:'',
				asmDues:'',
				propTax:'',
				bds: '',
				bathF: ''
			},
			bestCMA:[],
			noResultsMes:'',
			buildStats:{},
			buildInfo:{}
		};
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
	updateSPFields(event){
		let {subjectProperty} = this.state;
		let newState = {};
		newState[event.target.id] = event.target.value;
		//merging into an empty object, this.state.subjectProperty, and the newState received from the searchForm input
		let spObjectCopy = Object.assign({}, subjectProperty, newState);
		this.setState({
			subjectProperty: spObjectCopy
		});
	}
	//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	withCommas(str) {
		return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	//data request methods
	searchProperty(){
		//set the subject property array data to what the user submitted
		let {
			subjectProperty,
			catArr,
			catarrlegend,
			fillerObject
		} = this.state;
		this.setState({
			onView: 'loading',
			failText: null
		});
		axios.post('/search', subjectProperty).then(function(response){
			//after receiving the database data (an array of three arrays),
			//create the finalArray to send for mapping on cma results
			//here we are giving each of the first 3 properties arrays the
			//newKeys key values,
			//then currently setting those key values to foo, bar, baz
			var finalArray = [];
			var newKeys = [
				'adjUpdates',
				'adjMechanicals',
				'adjHW',
				'adjPremLoc',
				'netAdjustments',
				'netAdjustmentsPerc',
				'adjSPtoASF',
				'adjustedSalePrice'
			];
			//cmat (cma material) represents the array of properties objects received from the database
			var cmat = response.data[1];
			var ranking = response.data[2];
			var adjustments = response.data[3];
			var bstats = response.data[4];
			var binfo = response.data[5];
			function monthsDifference(todayMonth, todayYear, beforeMonth, beforeYear){
				var dif = (todayMonth - beforeMonth + (12 * (todayYear -beforeYear)));
				return dif <=0 ? 0: dif;
			}
			if(cmat.length > 1){
				if(cmat.length===2){
					cmat.push(fillerObject);
				}
				var fbb = ['foo', 'bar', 'baz'];
				for(var k = 0; k< newKeys.length; k++){
					cmat[0][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
					cmat[1][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
					cmat[2][newKeys[k]] = fbb[Math.floor(Math.random()*fbb.length)];
				}
				for(var i = 0; i<catArr.length; i++){
					//table line array (table row)
					var tla = [];
					if(i===0){
						tla[0] = catArr[i];
						var subjectAddressUnit = subjectProperty.unit !== '' ? ', unit ' + subjectProperty.unit : '';
						tla[1] = subjectProperty.strNumber + ' '+ subjectProperty.strName + subjectAddressUnit;
						tla[2] = cmat[0].strNumber + ' ' + cmat[0].strName + ' '+ cmat[0].sfx + ', unit ' + cmat[0].unit;
						tla[3] = '';
						tla[4] = cmat[1].strNumber + ' ' + cmat[1].strName + ' '+ cmat[1].sfx + ', unit ' + cmat[1].unit;
						tla[5] = '';
						tla[6] = cmat[2].strNumber + ' ' + cmat[2].strName + ' '+ cmat[2].sfx + ', unit ' + cmat[2].unit;
						tla[7] = '';
						finalArray.push(tla);
					}else if(i===4 || i===12 || i===13){//closed date, contract date, list date
						tla[0] = catArr[i];
						tla[1] = '';
						tla[2] = cmat[0][catarrlegend[i]].toString().substr(4,2) + '.' + cmat[0][catarrlegend[i]].toString().substr(6,2) + '.' + cmat[0][catarrlegend[i]].toString().substr(0,4);
						tla[3] = '';
						tla[4] = cmat[1][catarrlegend[i]].toString().substr(4,2) + '.' + cmat[1][catarrlegend[i]].toString().substr(6,2) + '.' + cmat[1][catarrlegend[i]].toString().substr(0,4);
						tla[5] = '';
						tla[6] = cmat[2][catarrlegend[i]].toString().substr(4,2) + '.' + cmat[2][catarrlegend[i]].toString().substr(6,2) + '.' + cmat[2][catarrlegend[i]].toString().substr(0,4);
						tla[7] = '';
						finalArray.push(tla);
					}else if(i===5){//appreciating / declining market factor adjustment
						var monthlyChange = (bstats.medspChange/12).toFixed(2);
						var today = new Date();
						tla[0] = catArr[i];
						tla[1] = '';
						tla[2] = monthlyChange + '%';
						tla[3] = '$' + Math.floor((monthlyChange * 0.0001 * monthsDifference(today.getMonth(), today.getFullYear(), parseInt(cmat[0].clsdDate.toString().substr(4,2)), parseInt(cmat[0].clsdDate.toString().substr(0,4))) * cmat[0].sp).toFixed(0))*100;
						tla[4] = monthlyChange + '%';
						tla[5] = '$' + Math.floor(((monthlyChange * 0.01 * monthsDifference(today.getMonth(), today.getFullYear(), parseInt(cmat[1].clsdDate.toString().substr(4,2)), parseInt(cmat[1].clsdDate.toString().substr(0,4))) * cmat[1].sp).toFixed(0))/100)*100;
						tla[6] = monthlyChange + '%';
						tla[7] = '$' + Math.floor((monthlyChange * 0.0001 * monthsDifference(today.getMonth(), today.getFullYear(), parseInt(cmat[2].clsdDate.toString().substr(4,2)), parseInt(cmat[2].clsdDate.toString().substr(0,4))) * cmat[2].sp).toFixed(0))*100;
						finalArray.push(tla);
					}else if(i===6 || i===7 || i===8){//asp, lp, olp
						tla[0] = catArr[i];
						tla[1] = '';
						tla[2] = '$' + this.withCommas(cmat[0][catarrlegend[i]].toString());
						tla[3] = '';
						tla[4] = '$' + this.withCommas(cmat[1][catarrlegend[i]].toString());
						tla[5] = '';
						tla[6] = '$' + this.withCommas(cmat[2][catarrlegend[i]].toString());
						tla[7] = '';
						finalArray.push(tla);
					}else if(i === 9){//sp/olp | sp/lp
						tla[0] = catArr[i];
						tla[1] = '';
						tla[2] = ((100*cmat[0].sp)/cmat[0].olp).toFixed(2) + '% | ' + ((100*cmat[0].sp)/cmat[0].lp).toFixed(2) + '%';
						tla[3] = '';
						tla[4] = ((100*cmat[1].sp)/cmat[1].olp).toFixed(2) + '% | ' + ((100*cmat[1].sp)/cmat[1].lp).toFixed(2) + '%';
						tla[5] = '';
						tla[6] = ((100*cmat[2].sp)/cmat[2].olp).toFixed(2) + '% | ' + ((100*cmat[2].sp)/cmat[2].lp).toFixed(2) + '%';
						tla[7] = '';
						finalArray.push(tla);
					}else if(i === 15 || i === 16){//property taxes, assessments
						tla[0] = catArr[i];
						tla[1] = '$' + this.withCommas(subjectProperty[catarrlegend[i]].toString());
						tla[2] = '$' + this.withCommas(cmat[0][catarrlegend[i]].toString());
						tla[3] = '';
						tla[4] = '$' + this.withCommas(cmat[1][catarrlegend[i]].toString());
						tla[5] = '';
						tla[6] = '$' + this.withCommas(cmat[2][catarrlegend[i]].toString());
						tla[7] = '';
						finalArray.push(tla);
					}else if(i===21){//asf | source
						tla[0] = catArr[i];
						tla[1] = subjectProperty[catarrlegend[i]] + ' | self';
						tla[2] = cmat[0][catarrlegend[i]] + ' | ' + cmat[0].sfSource;
						tla[3] = '';
						tla[4] = cmat[1][catarrlegend[i]] + ' | ' + cmat[1].sfSource;
						tla[5] = '';
						tla[6] = cmat[2][catarrlegend[i]] + ' | ' + cmat[2].sfSource;
						tla[7] = '';
						finalArray.push(tla);
					}else if(i===30){//sp/asf
						tla[0] = catArr[i];
						tla[1] = '';
						tla[2] = '$' + (cmat[0].sp / cmat[0].asf).toFixed(0) + '/sqft';
						tla[3] = '';
						tla[4] = '$' + (cmat[1].sp / cmat[1].asf).toFixed(0) + '/sqft';
						tla[5] = '';
						tla[6] = '$' + (cmat[2].sp / cmat[2].asf).toFixed(0) + '/sqft';
						tla[7] = '';
						finalArray.push(tla);
					}else{
						tla[0] = catArr[i];
						tla[1] = subjectProperty[catarrlegend[i]];
						tla[2] = cmat[0][catarrlegend[i]];
						tla[3] = '';
						tla[4] = cmat[1][catarrlegend[i]];
						tla[5] = '';
						tla[6] = cmat[2][catarrlegend[i]];
						tla[7] = '';
						finalArray.push(tla);
					}
				}
				//manipulate values here
				//ie create full address, add commas and $ to prices, taxes, assessments
				this.setState({
					bestCMA: finalArray,
					noResultsMes:'success! take a look at your results below.',
					buildStats: bstats,
					buildInfo: binfo,
					onView: 'stats'
				});
			}else{
				this.setState({
					noResultsMes: 'insufficient or low quality results found. please consult broker or try again.',
					bestCMA: [],
					buildStats: bstats,
					buildInfo: binfo,
					onView: 'search',
					failText: true
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
			subjectProperty,
			bestCMA,
			buildStats,
			buildInfo,
			onView,
			failText
		} = this.state;
		let self = this;
		let backClick = () => {
			self.setState({
				onView: 'search'
			});
		}
		return(
			<div className = 'fit-95 searchPropertyComponent' >
				<div className = 'user-nav'>welcome! username placeholder.</div>
				<div className={onView === 'loading' ? '' : 'hidden'}>
				    <div id="loadbox2" >
       					 <div className="loader cn-lang">analyzing. . .</div>
    				</div>
				</div>
				<div className ={onView === 'search'  ? 'search-form-container' : 'hidden'}>
					<div className={failText ? 'no-results-mes-top' : 'hidden'}>
						<span>
						{noResultsMes}
						<br/>
						please confirm <Link to='properties_available' activeClassName = 'active' className = 'no-results-pa-link'>
						searchable addresses</Link> lists your building.
						</span>
					</div>
					<SearchForm 
						searchPlease = {(submission) => this.searchProperty()}
						updateSpFields = {(input) => this.updateSPFields(input)}
						spfields = {subjectProperty}
						noResultsMessage = {noResultsMes}
					/>

				</div>
				<div className={onView === 'stats' ? '' : 'hidden'}>
					<strong onClick = {backClick} className= 'back-button'>SEARCH AGAIN</strong>
					<BuildingStatistics stat = {buildStats}/>
					<BuildingInfo info = {buildInfo}/>
				<Cma 
					res = {cmaResultsObj} 
					cma = {bestCMA}
				/>
				</div>
	
				<TsvButtons loadedAddresses = {this.state.addressesLoaded} getAddresses = {this.getAddresses}/>
		
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