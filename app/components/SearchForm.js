
// -when using es6, use the react lifecycle events:
// //need to initialize the state of the component in hooks (componentwillreceive props, componentwillmount) before the element is rendered

import * as React from 'react';

class SearchForm extends React.Component {
	//form event handlers
	handleSubmit(event){
		event.preventDefault();
		this.props.searchPlease(this.state);
	}
	handleUpdateType(event){
		const newState = {}
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}
	//set initial state
	initializeState(){
		this.setState({
			propertyType: this.props.defaultPropertyType || '',
			ptPlaceholder: 'hello there',
			address: 'enter property address'
		});
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
		this.initializeState();
	}
	// componentWillUnmount is called right before you eg navigate to a different route / a different component
	componentWillUnmount(){
		console.log('component unmounted');
	}
	render(){
		return(
			<div>
				<h2>search a property!</h2>
				<form onSubmit = {(event) => this.handleSubmit(event)}>
					{/*-when a label has attribute 'for' this makes the input with which it is associated clickable
					-htmlFor is necessary because in React, the for attribute in a label is htmlFor (like an html element has className instead of class)
					
-for the inputs attributes, use defaultValue instead of value because defaultValue allows you to edit the default values
--(otherwise if you use value, must have an onchange handler)
-onChange function: cannot write only `this.updateInput(event)` because in updateInput, this is not defined. As a result, must bind this function to the input. es5 would be this.updateInput(event).bind(this)
--so need to use the es6 syntax and use the "fat arrow" to find this onChange function to this input
---as a result, need to have onChange = {(event) => this.updateInput(event)}
----the first `(event) =>` is passed into the function from the input element

					*/}
					<label htmlFor = 'propertyType'>property type:</label>
					{/* use value attribute to set the default select html element value*/}
						<select
							value = {this.state.propertyType}
							className=''
							id="propertyType"
							onChange = {(event) => this.handleUpdateType(event)}
						>
							<option value='at'>attached (condo, townhome)</option>
							<option value='de'>detached (single family home)</option>
						</select>	
					<label htmlFor = 'test'>property type</label>
					<br/>
					<input
						type = 'text'
						id = 'test'
						placeholder = {this.state.ptPlaceholder}
						defaultValue = {this.state.propertyType}
						onChange = {(event) => this.handleUpdateType(event)}
					/>
					<br/>
					<label htmlFor = 'address'>address</label>
					<br/>
					<input
						defaultValue = {this.state.address}
						type = 'text'
						id = 'address'
						onChange = {(event) => this.handleUpdateType(event)}
					/>
				</form>
			</div>
		);
	}
}

// Props for PostForm component
// Requires a "searchPlease" function
// Optional "loading" boolean value
// Optional "defaultTitle" string value
// Optional "defaultCategory" string value
// Optional "defaultDate" string value
SearchForm.propTypes = {
	searchPlease: React.PropTypes.func.isRequired,
	defaultPropertyType: React.PropTypes.string,
};

export { SearchForm };
