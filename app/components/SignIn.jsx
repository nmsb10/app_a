import * as React from 'react';

class SignIn extends React.Component {
	constructor(props){
		super(props);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
	}
	render(){
		return(
			<div>SIGN IN SIGN IN SIGN IN
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
SignIn.contextTypes = {
	router: React.PropTypes.any
};

export {SignIn};