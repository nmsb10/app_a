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
			//cmat (cma material) represents the array of properties objects received from the database
			var cmat = response.data[0];
			var bstats = response.data[1];
			var binfo = response.data[2];
			var display = response.data[3];
			if(display){
				this.setState({
					bestCMA: cmat,
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
						searchable addresses</Link> lists your building. <a className = 'no-results-pa-link' href = "https://youtu.be/QLRlnkJPajs" target = "_blank">application demonstration</a>
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