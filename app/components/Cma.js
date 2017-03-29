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
	}
	componentDidMount(){
	}
	//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	withCommas(x) {
		return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render(){
		const cma = this.props.cmar;
		return(
			<div className = '' >
			{/*
				<div className=''>
					{this.props.cmar.map(function(elem, i) {
						return (
							<div key = {i} className = ''>
								<span>{i + 1} mls {elem.mlsNum}<br/>
								property type: {elem.typ}<br/>
								compass point: {elem.compassPoint}<br/>
								street number: {elem.strNumber}<br/>
								PIN: {elem.PIN}<br/>
								property tax: {elem.propTax}<br/>
								closed date: {elem.clsdDate}
								</span>
							</div>
						);
					{/*VERY IMPORTANT: INCLUDE `THIS` HERE SO YOU CAN PASS FUNCTIONS FROM THIS RESULTS.JS COMPONENT TO ELEMENTS WITHIN THIS MAPPING OF THE articlesFound ARRAY	
					},this)}
				</div>
			*/}
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
				
						{this.props.cma.map(function(elem, i){
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
						}, this)}
						{/*
						<tr>
							<td>{cma[0].cat}</td>
							<td>{this.props.res.sp.streetNumber} {this.props.res.sp.streetName}{this.props.res.sp.unitNumber !== '' && <span>, Unit {this.props.res.sp.unitNumber}</span>}</td>
							<td>{cma[2].strNumber} {cma[0].compassPoint} {cma[0].strName} {cma[0].sfx}{cma[0].unit !== '' && <span>, Unit {cma[0].unit}</span>}</td>
							<td></td>
							<td>{cma[3].strNumber} {cma[1].compassPoint} {cma[1].strName} {cma[1].sfx}{cma[1].unit !== '' && <span>, Unit {cma[1].unit}</span>}</td>
							<td></td>
							<td>{cma[4].strNumber} {cma[2].compassPoint} {cma[2].strName} {cma[2].sfx}{cma[2].unit !== '' && <span>, Unit {cma[2].unit}</span>}</td>
							<td></td>
						</tr>
					
						<tr>
							<td>property taxes</td>
							<td>${this.withCommas(this.props.res.sp.taxes)}</td>
							<td>{cma[0].propTax}</td>
							<td></td>
							<td>{cma[1].propTax}</td>
							<td></td>
							<td>{cma[2].propTax}</td>
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