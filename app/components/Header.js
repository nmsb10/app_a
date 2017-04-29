import * as React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: 'jonathon nagatani'
		};
		this.stringToArray = this.stringToArray.bind(this);
	}
	stringToArray(str){
		var arr = [];
		for(var i = 0; i<str.length; i++){
			arr.push(str[i]);
		}
		return arr;
	}
	render(){
		let {
			name
		} = this.state;
		let nameLetters = (this.stringToArray(name)).map(function(elem, i){
			return (
				<span className = 'head-let' key = {i}>{elem}</span>
			);
		});
		return (
			<header>
				<div id = 'home'>{nameLetters}</div>
			{/*
				<span id='home'>jonathon nagatani</span>
				<ul>
					<li className = 'h-li'>
						<Link to='welcome' activeClassName = 'active'>
						welcome home
						</Link>
					</li>
					<li className = 'h-li'>
						<Link to='search' activeClassName = 'active'>
						search property
						</Link>
					</li>
					<li className = 'h-li'>
						<Link to='properties_available' activeClassName = 'active'>
						searchable addresses
						</Link>
					</li>
				</ul>
			*/}
				
			</header>
		);
	}
}

export {Header};