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
			<div className = 'binfostats-section'>
				<div className = 'panel-inside'>
					<div className = 'header'>building statistics
					</div>
					<div className = 'content'>
						<table className = 'building-stats-table'>
							<tbody>
								<tr>
									<th></th>
									<th>24 - 12<br/>months prior</th>
									<th>12 - 0<br/>months prior</th>
									<th>% change</th>
								</tr>
								<tr></tr>
								<tr>
									<td># units sold</td>
									<td>{stat.unitsSold2412}</td>
									<td>{stat.unitsSold1200}</td>
									<td>{stat.usChange}%</td>
								</tr>
								<tr>
									<td>turnover %</td>
									<td>{stat.turnover2}%</td>
									<td>{stat.turnover1}%</td>
									<td>{stat.toChange}%</td>
								</tr>
								<tr>
									<td>median SP</td>
									<td>${stat.medSP2}</td>
									<td>${stat.medSP1}</td>
									<td>{stat.medspChange}%</td>
								</tr>
								<tr>
									<td>mean SP</td>
									<td>${stat.meanSP2}</td>
									<td>${stat.meanSP1}</td>
									<td>{stat.meanspChange}%</td>
								</tr>
								<tr>
									<td>mean (SP / ASF)</td>
									<td>${stat.meanSPASF2}</td>
									<td>${stat.meanSPASF1}</td>
									<td>{stat.meanSPASFChange}%</td>
								</tr>
								<tr>
									<td>mean MT</td>
									<td>{stat.meanMT2} days</td>
									<td>{stat.meanMT1} days</td>
									<td>{stat.meanMTChange}%</td>
								</tr>
								<tr>
									<td>mean LMT</td>
									<td>{stat.meanLMT2} days</td>
									<td>{stat.meanLMT1} days</td>
									<td>{stat.meanLMTChange}%</td>
								</tr>
								<tr>
									<td>mean SP / LP</td>
									<td>{stat.meanSPLP2}%</td>
									<td>{stat.meanSPLP1}%</td>
									<td>{stat.meanSPLPChange}%</td>
								</tr>
								<tr>
									<td>mean SP / OLP</td>
									<td>{stat.meanSPOLP2}%</td>
									<td>{stat.meanSPOLP1}%</td>
									<td>{stat.meanSPOLPChange}%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

BuildingStatistics.contextTypes = {
	router: React.PropTypes.any
};

export {BuildingStatistics};