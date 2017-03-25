import * as React from 'react';
import {SearchForm} from './SearchForm';
import * as d3 from 'd3';//https://www.npmjs.com/package/d3
// import {helper} from './utils/helpers';
var helper = require('./utils/helpers.js');

class SearchProperty extends React.Component {
	//set initial state
	initializeState(){
		this.setState({
			loadedDB: false
		});
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
		this.initializeState();
		console.log('props:', this.props);
	}
	componentDidMount(){
		//http://stackoverflow.com/questions/16177037/how-to-extract-information-in-a-tsv-file-and-save-it-in-an-array-in-javascript
		//https://github.com/d3/d3-request
		//nb: The d3.tsv method makes an AJAX request for data.
		// d3.tsv('/tsvplease', function(error, data) {
		// 	if(error){
		// 		console.log(error);
		// 	}else{
		// 		console.log(data);
		// 	}
		// });
		//http://learnjsdata.com/read_data.html
		if(!this.state.loadedDB){
			this.setState({
				loadedDB: true
			});			
			var q = d3.queue();
			//var tsvs = ['tsvplease', 'tsvTwo'];

			var files = [ 'export900michigan.TSV', '800michigan.TSV'];
			for(var i = 0; i < files.length; i++) {
				q.defer(d3.tsv,'/tsv/'+files[i]);
			}
			q.await(this.analyze);

		}else{
			console.log('loaded the tsv files already');
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
				<h3>get your sales comparison analysis here.</h3>
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