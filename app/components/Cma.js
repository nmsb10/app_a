import * as React from 'react';

class Cma extends React.Component {
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
		//const cmar2 = this.props.cmar;
		let {cma} = this.props;
		let CmaContents = cma.map((elem, i) => {
			return (
				<tr key = {i}>
			
					{elem.map(function(contents, j){
						return (
							<td key = {j}>{contents}</td>
						);
						
						})
					}
				{/*
					<td>{elem[0]}</td>
					<td>{elem[1]}</td>
					<td>{elem[2]}</td>
					<td>{elem[3]}</td>
					<td>{elem[4]}</td>
					<td>{elem[5]}</td>
					<td>{elem[6]}</td>
					<td>{elem[7]}</td>
				*/}
				</tr>
			);
		});
		return(
			<div className = '' >
				<table className = 'comps-table'>
					<tbody>
						<tr>
							<th></th>
							<th>subject property</th>
							<th>comp one</th>
							<th>comp1 adjustments</th>
							<th>comp two</th>
							<th>comp2 adjustments</th>
							<th>comp three</th>
							<th>comp3 adjustments</th>
						</tr>
						<tr></tr>
						{CmaContents}
					{/*
						<tr className = 'td-summary-stats'>
							<td>Adjusted Sale Price</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
					*/}
					</tbody>
				</table>
			</div>
		);
	}
}

// Search contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
Cma.contextTypes = {
	router: React.PropTypes.any
};

export {Cma};