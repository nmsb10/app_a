import * as React from 'react';
//import * as csurf from 'csurf';

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userProfile:{
				userName:'',
				email:'',
				password:''
			}
		};
		this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
		this.updateInput = this.updateInput.bind(this);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
	}
	updateInput(event){
		let {userProfile} = this.state;
		let newState = {};
		newState[event.target.id] = event.target.value;
		//merging into an empty object, this.state.subjectProperty, and the newState received from the searchForm input
		let objectCopy = Object.assign({}, userProfile, newState);
		this.setState({
			userProfile: objectCopy
		});
	}
	handleSignupSubmit(event){
		event.preventDefault();
		console.log(event);
		console.log(this.state.userProfile);
	}
	render(){
		let {
			userProfile
		} = this.state;
		return(
			<div>
				<span>SIGN UP SIGN UP THANK YOU FOR SIGNING UP!</span>
				<form onSubmit = {(event) => this.handleSignupSubmit(event)}>
					<div className = ''>
						<div className="">
							<label htmlFor = 'userName'>your name:</label>
							<input
								type="text"
								id="userName"
								value = {userProfile.userName}
								placeholder = 'name'
								onChange = {(event) => this.updateInput(event)}
							/>
						</div>
						<div className="">
							<label htmlFor = 'email'>e-mail address:</label>
							<input
								type="text"
								id="email"
								value = {userProfile.email}
								placeholder = 'e-mail'
								onChange = {(event) => this.updateInput(event)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor = 'unit'>password:</label>
							<input
								type="text"
								id="password"
								value = {userProfile.password}
								placeholder = 'password'
								onChange = {(event) => this.updateInput(event)}
							/>
						</div>
						<button
							type="submit"
							className=''
							id=""
							>
							sign up :)
						</button>	
					</div>
				</form>
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
SignUp.contextTypes = {
	router: React.PropTypes.any
};

export {SignUp};