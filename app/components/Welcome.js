import * as React from 'react';
import {Link} from 'react-router';
//http://stackoverflow.com/questions/37386901/react-webpack-loading-and-displaying-images-as-background-image

class Welcome extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tests:[
				{
					quote: 'Jonathon is a consistently professional Real Estate Expert - He provides outstanding responsive service, market knowledge, and a willingness to do additional marketing and even showcased my property for the best presentation to the marketplace. I will recommend him to all my friends on the North Shore! Great Job!',
					source: 'John S.'
				},
				{
					quote: 'I met Jonathon over three years ago through a recommendation from a close friend of mine. I was looking to find an apartment in Chicago at short notice and had a bunch of things I was particular about; Jonathon helped me find a place that offered them all! Jonathon helped me find my first rental pretty quick and when it was time to purchase my first home I knew I\'d want to get his help. He\'s always just a phone call away, at any time and has always been very helpful. Jonathon has a solid understanding of the real estate market and helped me understand the intricacies of the purchase process so that I felt comfortable and well-informed at every stage. He was also very accommodating of various requests and was thorough in his research and responses to various questions of mine. Always courteous and prompt, working with Jonathon has always been a pleasure. He\'s my go to guy for any Real Estate needs!',
					source: 'Hari R.'
				},
				{
					quote: 'I would just like to provide some feedback with regards to the service that Jonathon extended to us while we were selling our Lake Forest property. From beginning to end Jonathon’s professionalism was impressive.We originally chose Jonathan as an agent because we had received a mailing from him for homes in the neighborhood that clearly stood out above the rest. He did not disappoint. He had a professional photographer take pictures of the property, created a beautiful brochure and provided great online exposure. Jonathon also accompanied potential buyers to all the showings and provided us with feedback. He also kept us up to date on market activity. We were extremely pleased with Jonathon and look forward to working with him whenever we need an agent.',
					source: 'Monica K.'
				},
				{
					quote: 'We both appreciate very much your dedication and innovation in our search for a new home! We are so pleased with the house and want to thank you for all you did for us throughout the process.',
					source: 'Cate & Matthew F.'
				},
				{
					quote: 'Jane and I sincerely appreciate all the hard work you put into the sale of our condominium. We would recommend you to friends and potential clients without reservation, and would tell them the following:Jonathon won our business through his professional and thorough approach, and obtained a legitimate offer on our property (which subsequently resulted in a sale) within three weeks of listing. He provided us with timely, detailed and accurate market information to enable us to make informed decisions about the listing and sale of our condominium. He then aggressively marketed the property through customized mailings of his own design, extensive internet marketing, and a custom property website. He continually explored new sources of potential buyers. Our neighbors in the building commented on the fact that they received two mailings about our condominium within the short period of time it was on the market. Jonathon\'s hard work and creative approach worked for us, and are certain to produce successful results with future listings.',
					source: 'Jane and Steven A.'
				},
				{
					quote: 'We would like to express our enthusiastic endorsement of Jonathon Nagatani as a REALTOR. Among his many strengths are good listening and communication skills, diligence, enthusiasm and attention to detail. After not being able to sell our home in the Edgebrook neighborhood for nearly a year, we turned to Jonathon and the Koenig & Strey company to represent us as sellers. Jonathon developed and implemented a strong marketing program and then met with us weekly to provide a detailed analysis of the results to date. As a result of Jonathon\'s work of finding qualified buyers and the value-add of the Koenig & Strey network and services, we went under contract in less than a month in the winter of 2011. Jonathon negotiated aggressively on our behalf, facilitating a deal with which we were very pleased. He continued to work proactively, monitoring each step of the process through to a successful close.We absolutely would work with Jonathon again and highly recommend that you select him as your REALTOR.',
					source: 'Jackie and William G.'
				}
			],
			quotesArray: [],
			shownQuotes: 0,
			quoteDispTime: 5000,
			currentQuote:'',
			currentSource:''
		};
		this.displayQuotes = this.displayQuotes.bind(this);
		this.generateRandomArrayOrder = this.generateRandomArrayOrder.bind(this);
		this.showAQuote = this.showAQuote.bind(this);
		this.resetDisplayQuotes = this.resetDisplayQuotes.bind(this);
	}
	componentDidMount(){
		this.displayQuotes();
	}
	componentWillUnmount(){
		//clearing the interval of the global this.counter variable
		clearInterval(this.counter);
	}
	displayQuotes(){
		let {quoteDispTime} = this.state;
		this.resetDisplayQuotes();
		//create a global this.counter variable, so you can clearInterval when component unmounts
		this.counter = setInterval(this.showAQuote, quoteDispTime);
	}
	generateRandomArrayOrder(array){
		//http://www.w3schools.com/js/js_array_sort.asp
		array.sort(function(a, b){
			return 0.5 - Math.random();
		});
		return array;
	}
	resetDisplayQuotes(){
		let {tests} = this.state;
		var arr = this.generateRandomArrayOrder(tests);
		this.setState({
			shownQuotes:0,
			quotesArray: arr
		});
	}
	showAQuote(){
		let {
			tests,
			quotesArray,
			shownQuotes
		} = this.state;
		this.setState({
			currentQuote: quotesArray[shownQuotes].quote,
			currentSource: quotesArray[shownQuotes].source
		});
		if(shownQuotes < tests.length-1){
			this.setState({
				shownQuotes: shownQuotes+1
			});
		}else{
			this.resetDisplayQuotes();
		}
	}
	render() {
		let {
			currentQuote,
			currentSource,
		} = this.state;
		return (
			<div className = 'welcome-content'>
				<div className = 'intro'>
					<div className = 'welcome-nav'>
						<div>what describes you?</div>
						<nav id = 'intro-nav'>
							<a>buyer<span className="tooltiptext">guidance on buying a home</span></a>
							<a>seller<span className="tooltiptext">guidance with selling your home</span></a>
							<a>investor<span className="tooltiptext">invest in real estate</span></a>
							<a>renter<span className="tooltiptext">guidance with finding your rental</span></a>
							<a>landlord<span className="tooltiptext">lease your property</span></a>
							<Link to='search' activeClassName = 'active'>AVM demo<span className="tooltiptext">try the AVM demonstration</span></Link>
						</nav>
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'content' id= 'welcome-c2'>
					impartial. transparent. accurate.
					<br/>
					always offer solutions.
					<br/>
					anyone can complain about problems.
					</div>
				</div>
				<div className = 'intro'>
					<div className = 'content welcome-c3'>
						<div className = 'one-quote'>
							{currentSource}
							{currentQuote===''? 'testimonials for Jonathon Nagatani...': currentQuote}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export {Welcome};