import * as React from 'react';
var helper = require('./utils/helpers.js');

class UserSearches extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searches:[]
		};
		this.getSearches = this.getSearches.bind(this);
	}
	componentDidMount(){
		this.getSearches();
		console.log('user searches component did mount');
	}
	getSearches(){
		console.log('user searches getSeraches function called');
		helper.getUserSearches().then(function(res){
			if(res !== this.state.searches){
				this.setState({
					searches: res.data
				});
			}
		}.bind(this));
	}
	render(){
		return(
			<div className = 'fit-95'>
			<span>hello hello hello!!</span>
			{this.state.searches.map(function(elem, i) {
				return (
					<div key = {i} className = ''>
						<span>{elem.AddressEntered} searched on {elem.searchDate}</span>
					</div>
				);
			{/*VERY IMPORTANT: INCLUDE `THIS` HERE SO YOU CAN PASS FUNCTIONS FROM THIS RESULTS.JS COMPONENT TO ELEMENTS WITHIN THIS MAPPING OF THE articlesFound ARRAY*/}
			},this)}
			</div>
		);
	}
}

UserSearches.contextTypes = {
	router: React.PropTypes.any
};

export {UserSearches};