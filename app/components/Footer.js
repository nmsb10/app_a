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
				<div id="footer-content">
					Copyright &copy; {this.state.year} <a className="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank" title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.
				</div>
			</footer>
		);
	}
}

export {Footer};