import * as React from 'react';

class BuildingInfo extends React.Component {
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
		let {info} = this.props;
		return(
			<div className = 'ts-third' >
				<div className = 'panel-inside'>
					<div className = 'header'>general property information
					</div>
					<div className = 'content'>
						<div className = 'info-div'>
							total number of units: <span className = 'info-span'>{info.units}</span>
						</div>
						<div className = 'info-div'>
							building amenities: <span className = 'info-span'>{info.buildingAmen}</span>
						</div>
						<div className = 'info-div'>
							common area amenities: <span className = 'info-span'>{info.commonAmen}</span>
						</div>
						<div className = 'info-div'>
							assessment includes: <span className = 'info-span'>{info.assessInc}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

BuildingInfo.contextTypes = {
	router: React.PropTypes.any
};

export {BuildingInfo};