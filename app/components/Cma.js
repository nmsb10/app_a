import * as React from 'react';

class Cma extends React.Component {
	//set initial state
	initializeState(){
		this.setState({
			res: this.props.res.sp
		});
	}
	//lifecycle methods
	// componentWillReceiveProps(); componentWillMount(); render(); componentDidMount()
	componentWillMount(){
		this.initializeState();
		console.log('cma props:', this.props);
		console.log('cma state:', this.state);
	}
	componentDidMount(){
	}
	//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	withCommas(x) {
		return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render(){
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
						<tr>
							<td>address</td>
							<td>{this.props.res.sp.streetNumber} {this.props.res.sp.streetName}{this.props.res.sp.unitNumber !== '' && <span>, Unit {this.props.res.sp.unitNumber}</span>}</td>
							<td>comp1 address</td>
							<td></td>
							<td>comp2 address</td>
							<td></td>
							<td>comp3 address</td>
							<td></td>
						</tr>
						<tr>
							<td>mls #</td>
							<td></td>
							<td>comp1 mls#</td>
							<td></td>
							<td>comp2 mls#</td>
							<td></td>
							<td>comp3 mls#</td>
							<td></td>
						</tr>
						<tr>
							<td>status</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>original list price</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>list price</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>sold price</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>SP/OLP | SP/LP</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>financing type</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>distressed?</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>list date</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>contract date</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>closed date</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>appreciating/declining/stable market factor adjustment</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>market time</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>property taxes</td>
							<td>${this.withCommas(this.props.res.sp.taxes)}</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>assessments</td>
							<td>${this.withCommas(this.props.res.sp.asm)}</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td># rooms</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td># bedrooms</td>
							<td>{this.props.res.sp.br}</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td># full bathrooms</td>
							<td>{this.props.res.sp.baF}</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td># half bathrooms</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>ASF & source</td>
							<td>{this.withCommas(this.props.res.sp.squareFeet)} | self</td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>exposure(s)</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>PIN(s)</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>updates adjustment</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>mechanicals adjustment</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>hw floors adjustment</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr>
							<td>premium location adjustment</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr className = 'td-summary-stats'>
							<td>SP / ASF</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr className = 'td-summary-stats'>
							<td>Adjusted SP / ASF</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr className = 'td-summary-stats'>
							<td>Net Adjustments</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
						</tr>
						<tr className = 'td-summary-stats'>
							<td>Net Adjustments %</td>
							<td></td>
							<td>comp1 details</td>
							<td>adjustment</td>
							<td>comp2 details</td>
							<td>adjustment</td>
							<td>comp3 details</td>
							<td>adjustment</td>
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