
// when using es6, use the react lifecycle events:
// need to initialize the state of the component in hooks (componentwillreceive props, componentwillmount) before the element is rendered

import * as React from 'react';

class SearchForm extends React.Component {
	//set initial state
	initializeState(){
		this.setState({
			propertyType: this.props.defaultPropertyType || '',
			streetNumber: '',
			streetName: '',
			unitNumber:'',
			squareFeet:'',
			asm:'',
			taxes:'',
			br: '',
			baF: ''
		});
	}
	//form event handlers
	handleSubmit(event){
		event.preventDefault();
		this.props.searchPlease(this.state);
	}
	handleInputChange(event){
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
		this.props.updateCmaSp(this.state);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
		this.initializeState();
	}
	// componentWillUnmount is called right before you eg navigate to a different route / a different component
	componentWillUnmount(){
	}
	render(){
		return(
			<div className = 'ts-third search-form-1'>
				<span>enter your property details</span>
				<form onSubmit = {(event) => this.handleSubmit(event)}>
					{/*
					when a label has attribute 'for' this makes the input with which it is associated clickable
					htmlFor is necessary because in React, the for attribute in a label is htmlFor (like an html element has className instead of class)
					for the inputs attributes, use defaultValue instead of value because defaultValue allows you to edit the default values
					(otherwise if you use value, must have an onchange handler)
					onChange function: cannot write only `this.updateInput(event)` because in updateInput, this is not defined. As a result, must bind this function to the input. es5 would be this.updateInput(event).bind(this)
					so need to use the es6 syntax and use the "fat arrow" to find this onChange function to this input
					as a result, need to have onChange = {(event) => this.updateInput(event)}
					the first `(event) =>` is passed into the function from the input element
					*/}
					<div className = 'form-group'>
						<label htmlFor = 'propertyType'>property type:</label>
						{/* use value attribute to set the default select html element value*/}
						<select
							value = {this.state.propertyType}
							className=''
							id="propertyType"
							onChange = {(event) => this.handleInputChange(event)}
						>
							<option value='at'>attached (condo, townhome)</option>
							<option value='de'>detached (single family home)</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor = 'streetNumber'>street number:</label>
						<input
							type="text"
							id="streetNumber"
							value = {this.state.streetNumber}
							placeholder = 'street number'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'streetName'>street name:</label>
						<input
							type="text"
							id="streetName"
							value = {this.state.streetName}
							placeholder = 'street name'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'unitNumber'>unit number:</label>
						<input
							type="text"
							id="unitNumber"
							value = {this.state.unitNumber}
							placeholder = 'unit number'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'squareFeet'>approximate square feet:</label>
						<input
							type="text"
							id="squareFeet"
							value = {this.state.squareFeet}
							placeholder = 'square feet'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'asm'>monthly assessments: $</label>
						<input
							type="text"
							id="asm"
							value = {this.state.asm}
							placeholder = 'monthly assessments'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'taxes'>property taxes: $</label>
						<input
							type="text"
							id="taxes"
							value = {this.state.taxes}
							placeholder = 'property taxes'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'br'># bedrooms:</label>
						<input
							type="text"
							id="br"
							value = {this.state.br}
							placeholder = '# bedrooms'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'baF'># full bathrooms:</label>
						<input
							type="text"
							id="baF"
							value = {this.state.baF}
							placeholder = '# full bathrooms'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<button
						type="submit"
						className=''
						id="runSearch"
						>
						get answers
					</button>
					<br/>
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
