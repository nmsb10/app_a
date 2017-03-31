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
			<div className = 'ts-third'>
				<div className = 'panel-inside'>
					<div className = 'header'>building statistics
					</div>
					<div className = 'content'>
						<table className = 'building-stats-table'>
							<tbody>
								<tr>
									<th></th>
									<th>24 - 12</th>
									<th>12 - 0</th>
									<th>% change</th>
								</tr>
								<tr></tr>
								<tr>
									<td># units sold</td>
									<td>{stat.unitsSold2412}</td>
									<td>{stat.unitsSold1200}</td>
									<td>{stat.usChange}</td>
								</tr>
								<tr>
									<td>turnover %</td>
									<td>{stat.turnover2}</td>
									<td>{stat.turnover1}</td>
									<td>{stat.toChange}</td>
								</tr>
								<tr>
									<td>median SP</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>mean SP</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>mean (SP / ASF)</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>mean MT</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>mean LMT</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>mean SP / LP</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>mean SP / OLP</td>
									<td></td>
									<td></td>
									<td></td>
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