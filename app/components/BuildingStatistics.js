import * as React from 'react';

class BuildingStatistics extends React.Component {
	constructor(props){
		super(props);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
	}
	render(){
		let {stat} = this.props;
		return(
			<div className = 'ts-third' >
				<div className = 'header'>building statistics
				</div>
				<div className = 'content'>content content content adsflkaflk a 
				</div>
			</div>
		);
	}
}

BuildingStatistics.contextTypes = {
	router: React.PropTypes.any
};

export {BuildingStatistics};