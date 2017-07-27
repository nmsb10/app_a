import * as React from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.onNavigateHome = this.onNavigateHome.bind(this);
	}
	onNavigateHome(){
		browserHistory.push('/welcome');
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
	}
	render(){
		return(
			<div className = 'fit-95'>
				<div>welcome to the {this.props.params.client_category} login page! 
				</div>
				<button onClick = {this.onNavigateHome}>go back
				</button>
				<div>please authenticate yourself</div>
				<Link to='signin' activeClassName = 'active'>sign IN</Link>
				<br/>
				<Link to={'signup'} activeClassName = 'active'>sign UP</Link>
			{/*
				{this.props.children}
			*/}
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
Login.contextTypes = {
	router: React.PropTypes.any
};

export {Login};