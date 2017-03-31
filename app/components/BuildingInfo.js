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
							<span className = 'title'>common name:</span>
							<br/>
							<span className = 'info-span'>{info.name}</span>
						</div>
						<div className = 'info-div'>
							<span className = 'title'>total number of units:</span>
							<br/>
							<span className = 'info-span'>{info.units}</span>
						</div>
						<div className = 'info-div'>
							<span className = 'title'>common area amenities:</span>
							<br/>
							<span className = 'info-span'>{info.commonAmen}</span>
						</div>
						<div className = 'info-div'>
							<span className = 'title'>assessment includes:</span>
							<br/>
							<span className = 'info-span'>{info.assessInc}</span>
						</div>
						<div className = 'info-div'>
							<span className = 'title'>extra info:</span><span className = 'info-span'>{info.buildingAmen}</span>
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