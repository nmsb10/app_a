import * as React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
	render(){
		return (
			<header>
				<span id='home'>jonathon nagatani</span>
				<ul>
					<li className = 'h-li'>
						<Link to='search' activeClassName = 'active'>
						search property
						</Link>
					</li>
				</ul>
				{/*
				<ul id = 'header-links'>
					<li className='hlink dropdown'>about
						<div className='dropdown-content'>
							<a href = 'https://www.youtube.com/user/JonathonNagatani' target='_blank' title='Jonathon on YouTube'>YouTube</a>
							<a href='https://www.linkedin.com/in/jonathonnagatani' target='_blank' title='Jonathon on LinkedIn'>LinkedIn</a>
							<a href = './about/standards.html' title = "a few of Jonathon's standards">standards</a>
						</div>
					</li>
					<li className='hlink dropdown'><a className = 'hlink-a' href="./homeworks.html">homeworks</a>
						<div className="dropdown-content">
							<a href="homeworks/hw3.html" target='_blank'>Homework 3</a>
							<a href="homeworks/hw4.html" target='_blank'>Homework 4</a>
							<a href="homeworks/hw5.html" target='_blank'>Homework 5</a>
							<a href="homeworks/hw6.html" target='_blank'>Homework 6</a>
							<a href="homeworks/hw7.html" target='_blank'>Homework 7</a>
							<a href = 'https://youtu.be/M3w1Te47G5o' target = '_blank'>Homework 10</a>
							<a href = 'https://jn1.herokuapp.com/' target = '_blank'>Homework 12</a>
							<a href = 'https://homework14jn.herokuapp.com/' target = '_blank'>Homework 14</a>
							<a href = 'https://homework15jn.herokuapp.com/' target = '_blank'>Homework 15</a>
						</div>
					</li>
					<li className='hlink'>contact</li>
				</ul>
				*/}
			</header>
		);
	}
}

export {Header};