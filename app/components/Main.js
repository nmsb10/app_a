import * as React from 'react';
import {Header} from './Header';
import {Footer} from './Footer';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dbLoaded: false
		};
	}
	render() {
		return (
			<div className = 'all-content'>
				<Header />
					{this.props.children}
				<Footer />
			</div>
		);
	}
}

export {Main};