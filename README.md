# real estate "automated valuation model" - like application
Project Three: This represents my third and final project for the Northwestern Coding Boot Camp. A Single Page Application using React.js with a node and express server. The user enters a description of a property, then receives statistics related to that property in addition to a Comparative Market Analysis. Searches enabled by accessing a mongo database of mongoose schemas / models; collections are populated with documents of actual property listings. Front-end framework completely custom designed using CSS3.

## Technologies Used
- React.js
- Node.js
- express
- mongodb
- mongoose
- JavaScript
- JSX
- CSS3
- react-router
- webpack
- babel
- css-loader
- additional node libraries including axios and d3

## Review of the code
A few items for your consideration.

### First populating the mongo database with the property information
In order to have properties to query, first I used the d3 package to take TSV files and send the data to the server to be entered as documents into the Property collection.

In the TsvButtons.js component, see below in the event my "good1tsvFiles" was an array of different TSV file names:
```
var q = d3.queue();
for(var i = 0; i < this.state.good1tsvFiles.length; i++) {
	q.defer(d3.tsv,'/tsv/'+ this.state.good1tsvFiles[i]);
}
q.awaitAll(this.sendAllTsv);
```

the sendAllTsv function:
```
sendAllTsv(error, results){
	if(error){
		console.log(error);
	}else{
		//results is an array of arrays
		results.forEach(function(item){
			return axios.post('/load/tsv', item);
		});
	}
}
```

In server.js, the data is received with a post request and entered appropriately in the Property collection.
```
app.post('/load/tsv', function(request, response){	
	var rb = request.body;
	for(var i = 0; i < rb.length; i++){
		if(rb[i].TYP==='AT'){
			Property.create({
				typ: rb[i].TYP,
				strNumber: rb[i]['Street #'],
				compassPoint: rb[i].CP.toLowerCase(),
				strName: rb[i]['Str Name'].toLowerCase(),
				sfx: rb[i].Sfx.toLowerCase(),
				unit: rb[i]['Unit #'],
				city: rb[i].City.toLowerCase(),
```

### SearchForm.js and SearchProperty.js

## Authors

* **Jonathon Nagatani** - *did everything* - [Jonathon Nagatani](https://github.com/nmsb10)

## See for yourself

* [the project](https://avm-jn.herokuapp.com/)