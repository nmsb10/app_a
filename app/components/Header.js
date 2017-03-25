import * as React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
	render(){
		return (
			<header>
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
				</ul>
				
			</header>
		);
	}
}

export {Header};