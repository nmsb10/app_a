import * as React from 'react';
import {Header} from './Header';
import {Footer} from './Footer';

class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className = 'all-content'>
				<Header />
				{/*
					<h2>main main main hello great job.</h2>
				*/}
				<div className = 'prime-content'>
					<div className = 'parallax'>
					</div>
					<div className = 'parallax'>
					</div>
					<div className = 'parallax'>
					</div>
				{/*
					{this.props.children}
				*/}
				</div>
				<Footer />
			</div>
		);
	}
}

export {Main};