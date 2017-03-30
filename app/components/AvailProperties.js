import * as React from 'react';
var helper = require('./utils/helpers.js');

class AvailProperties extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addressesLoaded:[]
		};
		this.getAddresses = this.getAddresses.bind(this);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
		this.getAddresses();
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
	render(){
		return(
			<div className = 'fit-95'>
			{/*This panel will hold the resulting addresses input to the database already
			Address and createdDate*/}
			{this.state.addressesLoaded.map(function(elem, i) {
				return (
					<div key = {i} className = ''>
						<span>{elem.Address} added on {elem.createdDate}</span>
					</div>
				);
			{/*VERY IMPORTANT: INCLUDE `THIS` HERE SO YOU CAN PASS FUNCTIONS FROM THIS RESULTS.JS COMPONENT TO ELEMENTS WITHIN THIS MAPPING OF THE articlesFound ARRAY*/}
			},this)}
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
AvailProperties.contextTypes = {
	router: React.PropTypes.any
};

export {AvailProperties};