import * as React from 'react';
import {SearchForm} from './SearchForm';
import * as axios from 'axios';
import * as d3 from 'd3';


class SearchProperty extends React.Component {
	componentDidMount(){
		d3.tsv('/tsvplease', function(error, data) {
			if(error){
				console.log(error);
			}else{
				console.log(data);
			}
		});
	}
	redirectToSearch(){
		//'search' is the Route path from routes.js
		this.context.router.push('search');
	}
	//data request methods
	searchProperty(propertyObject){
		axios.post('/search', propertyObject)
			.then(() => {
				this.redirectToSearch();
			})
			.catch((error) => {
				console.log('search didn\'t work. darn.');
			});
	}
	render(){
		return(
			<div>
				<h1>get your sales comparison analysis here.</h1>
				<SearchForm
					searchPlease = {(submission) => this.searchProperty(submission)}
					defaultPropertyType = {'AT'}
				/>
				<table className = 'comps-table'>
					<tbody>
						<tr>
							<th>subject property</th>
							<th>comparable one</th>
							<th>comp1 adjustments</th>
							<th>comparable two</th>
							<th>comp2 adjustments</th>
						</tr>
						<tr></tr>
						<tr>
							<td>sp adjustments</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>sp adjustments</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>sp adjustments</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>sp adjustments</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>sp adjustments</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
						</tr>
					</tbody>
				</table>
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