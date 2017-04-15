import * as React from 'react';

class Footer extends React.Component {
	//set initial state
	initializeState(){
		this.setState({
			year: this.currentDate('year'),
			month: this.currentDate('month')
		});
	}
	//lifecycle methods:
	componentWillMount(){
		this.initializeState();
	}
	currentDate(selection){
		//http://www.w3schools.com/jsref/jsref_obj_date.asp
		var d = new Date();
		switch(selection){
			case 'year':
				return d.getFullYear();
			case 'month':
				return this.getMonth(d.getMonth());
			default:
				break;
		}
	}
	getMonth(monthInt){
		return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].splice(monthInt, 1).toString();
	}
	render() {
		return (
			<footer>
				<div className = 'footer-notice'>
					<span>All images the product and property of Jonathon Nagatani.
					</span>
				</div>
				<div id="footer-content">
					Copyright &copy; {this.state.year}  <a className="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank" title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.
				</div>
				<div className = 'footer-notice'>
					<span>Property and local market data sourced from Midwest Real Estate Data, LLC (MLS). Data demed reliable but not guaranteed.
					<br/>Equal Housing Opportunity. License available for inspection at @properties, 600 North Western Avenue, Lake Forest, Illinois 60045.
					</span>
				</div>
			</footer>
		);
	}
}

export {Footer};