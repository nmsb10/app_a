import * as React from 'react';

class Cma extends React.Component {
	constructor(props){
		super(props);
		this.withCommas = this.withCommas.bind(this);
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
	}
	componentDidMount(){
	}
	//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	withCommas(x) {
		return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render(){
		//const cmar2 = this.props.cmar;
		let {cma} = this.props;
		let CmaContents = cma.map((elem, i) => {
			return (
				<tr key = {i}>
				{/*
					{elem.map(function(inside){
						return (
							<td>{inside}</td>
						);
						
						})
					}
				*/}
					<td>{elem[0]}</td>
					<td>{elem[1]}</td>
					<td>{elem[2]}</td>
					<td></td>
					<td>{elem[3]}</td>
					<td></td>
					<td>{elem[4]}</td>
					<td></td>
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
							<th>comparable one</th>
							<th>comp1 adjustments</th>
							<th>comparable two</th>
							<th>comp2 adjustments</th>
							<th>comparable three</th>
							<th>comp3 adjustments</th>
						</tr>
						<tr></tr>
						{CmaContents}

					{/*
						<tr>
							<td>{cmar2[0].cat}</td>
							<td>{this.props.res.sp.streetNumber} {this.props.res.sp.streetName}{this.props.res.sp.unitNumber !== '' && <span>, Unit {this.props.res.sp.unitNumber}</span>}</td>
							<td>{cmar2[2].strNumber} {cmar2[0].compassPoint} {cmar2[0].strName} {cmar2[0].sfx}{cma[0].unit !== '' && <span>, Unit {cmar2[0].unit}</span>}</td>
							<td></td>
							<td>{cmar2[3].strNumber} {cmar2[1].compassPoint} {cmar2[1].strName} {cmar2[1].sfx}{cma[1].unit !== '' && <span>, Unit {cmar2[1].unit}</span>}</td>
							<td></td>
							<td>{cmar2[4].strNumber} {cmar2[2].compassPoint} {cmar2[2].strName} {cmar2[2].sfx}{cma[2].unit !== '' && <span>, Unit {cmar2[2].unit}</span>}</td>
							<td></td>
						</tr>
						<tr>
							<td>property taxes</td>
							<td>${this.withCommas(this.props.res.sp.taxes)}</td>
							<td>{cmar2[0].propTax}</td>
							<td></td>
							<td>{cmar2[1].propTax}</td>
							<td></td>
							<td>{cmar2[2].propTax}</td>
							<td></td>
						</tr>
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