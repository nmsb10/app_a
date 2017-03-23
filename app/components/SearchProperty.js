import * as React from 'react';
import {SearchForm} from './SearchForm';
import * as axios from 'axios';

class Search extends React.Component {
	redirectToSearch(){
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
				<h2>search a property!</h2>
				{/*
				<SearchForm
					searchPlease = {(submission) => this.searchProperty(submission)}
					defaultPropertyType = {'AT'}
				/>
			*/}
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
Search.contextTypes = {
	router: React.PropTypes.any
};

export {Search};