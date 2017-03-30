// when using es6, use the react lifecycle events:
// need to initialize the state of the component in hooks (componentwillreceive props, componentwillmount) before the element is rendered

import * as React from 'react';

class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			typ: this.props.defaultPropertyType || '',
			strNumber: '',
			strName: '',
			unit:'',
			asf:'',
			asmDues:'',
			propTax:'',
			bds: '',
			bathF: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
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
		//this.props.updateCmaSp(this.state);
		//this.props.updateSpFields(this.state);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	// componentWillUnmount is called right before you eg navigate to a different route / a different component
	componentWillUnmount(){
	}
	render(){
		let {
			typ,
			strNumber,
			strName,
			unit,
			asf,
			asmDues,
			propTax,
			bds,
			bathF
		} = this.state;
		return(
			<div className = 'ts-third search-form-1'>
				<span className = 'no-results-mes'>{this.props.noResultsMessage}</span>
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
					<div className = 'sf-header'>enter your property details</div>
					<div className = 'sf-content'>
						<div className = 'form-group'>
							<label htmlFor = 'typ'>property type:</label>
							{/* use value attribute to set the default select html element value*/}
							<select
								value = {typ}
								className=''
								id="typ"
								onChange = {(event) => this.handleInputChange(event)}
							>
								<option value='at'>attached (condo, townhome)</option>
								<option value='de'>detached (single family home)</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor = 'strNumber'>street number:</label>
							<input
								type="text"
								id="strNumber"
								value = {strNumber}
								placeholder = 'street number'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'strName'>street name:</label>
							<input
								type="text"
								id="strName"
								value = {strName}
								placeholder = 'street name'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'unit'>unit number:</label>
							<input
								type="text"
								id="unit"
								value = {unit}
								placeholder = 'unit number'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'asf'>approximate square feet:</label>
							<input
								type="text"
								id="asf"
								value = {asf}
								placeholder = 'square feet'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'asmDues'>monthly assessments: $</label>
							<input
								type="text"
								id="asmDues"
								value = {asmDues}
								placeholder = 'monthly assessments'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'propTax'>property taxes: $</label>
							<input
								type="text"
								id="propTax"
								value = {propTax}
								placeholder = 'property taxes'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'bds'># bedrooms:</label>
							<input
								type="text"
								id="bds"
								value = {bds}
								placeholder = '# bedrooms'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'bathF'># full bathrooms:</label>
							<input
								type="text"
								id="bathF"
								value = {bathF}
								placeholder = '# full bathrooms'
								onChange = {(event) => this.handleInputChange(event)}
							/>
						</div>
					</div>
					<div className = 'sf-submit-button'>
						<button
							type="submit"
							className=''
							id="runSearch"
							>
							get answers
						</button>
					</div>
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
