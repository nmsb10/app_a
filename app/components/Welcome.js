import * as React from 'react';
//import {imageOne} from '../assets/images/01.JPG';
//http://stackoverflow.com/questions/37386901/react-webpack-loading-and-displaying-images-as-background-image

class Welcome extends React.Component {
	render() {
		return (
			<div className = 'welcome-content'>
				<div className = 'intro'>
					<div className = 'content welcome-c1'>impartial. transparent. accurate.
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'content' id= 'welcome-c2'>
					always offer solutions.
					<br/>
					anyone can complain about problems.
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'content welcome-c3'>thank you for visiting!
					</div>
				</div>
			</div>
		);
	}
}

export {Welcome};