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
	}
	getSearches(){
		helper.getUserSearches().then(function(res){
			if(res !== this.state.searches){
				var searchesEdited = [];
				for(var i = 0; i < res.data.length; i++){
					var indSearch = [''];
					indSearch.push(res.data[i].type);
					indSearch.push(res.data[i].streetNumber + ' ' + res.data[i].streetName);
					indSearch.push(res.data[i].unit);
					indSearch.push(res.data[i].asf);
					indSearch.push(res.data[i].assessments);
					indSearch.push(res.data[i].taxes);
					indSearch.push(res.data[i].bedrooms);
					indSearch.push(res.data[i].bathrooms);
					indSearch.push(res.data[i].searchDate);
					searchesEdited.push(indSearch);
				}
				this.setState({
					searches: searchesEdited
				});
			}
		}.bind(this));
	}
	render(){
		let searchContents = this.state.searches.map((elem, i) => {
			return (
				<tr key = {i}>
					{elem.map(function(contents, j){
						return (
							<td key = {j}>{contents}</td>
						);
					})}
				</tr>
			);
		});
		return(
			<div className = 'fit-95'>
				<div className = 'cma-table-container' >
					<table className = 'comps-table'>
						<tbody>
							<tr>
								<th></th>
								<th>type</th>
								<th>address</th>
								<th>unit</th>
								<th>sqft</th>
								<th>assessments</th>
								<th>taxes</th>
								<th>beds</th>
								<th>baths</th>
								<th>searched</th>
							</tr>
							<tr></tr>
							{searchContents}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

UserSearches.contextTypes = {
	router: React.PropTypes.any
};

export {UserSearches};