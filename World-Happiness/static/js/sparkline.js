// set the url to the full json dataset all countries all years
var url = 'http://localhost:5000/api/v1.0/All'

//h/t https://stackoverflow.com/questions/33729004/add-sparkline-to-d3-js-table-generated-from-nested-json-data
//h/t http://plnkr.co/edit/Ku9XdQ7mdTrkUhXQyBH1?p=preview&preview

var data;

var line = d3.svg.line()
	.x(function(d){return xScale(d.year);})
	.y(function(d){return yScale(d.value);});

d3.json(url, function(json) {

            jsonData = json;
            console.log(jsonData)
			
			json.forEach(function(d) {
			  d.value = Math.round(+d.happiness_score * 100) / 100
			  d.year = +d.Year;
			});

			// add years for select indicator
			var nestyr = d3.nest()	    
				.key(function(d) { return d.year; })
		 		.sortKeys(d3.ascending)
				.map(json);

			var yearstring = Object.keys(nestyr);

			// //////////////////////////
			var width = 200, height = 25;
			var graph = d3.select("#sparks")
			var minInd = d3.min(json, function(d) { return d.value;} )
			var maxInd = d3.max(json, function(d) { return d.value;} )

			xScale = d3.scale.linear().range([0, width - 10]).domain(d3.extent(json, function(d) { return d.year; })),	
			yScale = d3.scale.linear().range([height, 0]).domain([minInd,maxInd]),

			xAxis = d3.svg.axis().scale(xScale).tickFormat(d3.format('0f')),
			yAxis = d3.svg.axis().scale(yScale).orient("left");

			var type = d3.nest()
			      .key(function(d) { return d.country; })
			  		.sortKeys(d3.ascending)
			      .entries(json);
		
		var tableData = [],
	    	countries = {};
			json.forEach(function (d) {
	    	var country = countries[d.country];
	    	if (!country) {
	        	tableData.push(country = countries[d.country] = {});
	    		}
	     	country[d.year] = d.value,
		   	countries[d.country].Country = d.country;
		});
		
		console.log("tableData", tableData)

		yearstring.unshift("Country");
		yearstring.push("Sparkline");

		updateGraph(data);

		// render the table(s)
		tabulate(tableData, yearstring);

}); // close json


function updateGraph(data) {
							
// add years for select indicator
	var nestyr = d3.nest()	    
			.key(function(d) { return d.year; })
	 		.sortKeys(d3.ascending)
			.map(jsonData);
	
	var yearstring = Object.keys(nestyr);			
	
 	minyear = d3.min(yearstring);
	maxyear = d3.max(yearstring);															

};

function tabulate(newData, columns) {
	
			var type = d3.nest()
	      .key(function(d) { return d.country; })
	  		.sortKeys(d3.ascending)
	      .entries(jsonData);
	
			var table = d3.select('#indcontent').append('table').attr("class", "table")
			var thead = table.append('thead').attr("class", "thead-dark")
			var	tbody = table.append('tbody');
			
			// append the header row
			thead.append('tr')
			  .selectAll('th')
			  .data(columns).enter()
			  .append('th')
			    .text(function (column) { return column; });

			// create a row for each object in the data
			var rows = tbody.selectAll('tr')
			  .data(newData)
			  .enter()
			  .append('tr');
			
			  // add stripes to the table
		    rows.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
			
		
			// create a cell in each row for each column
			var cells = rows.selectAll('td')
			  .data(function (row) {
			    return columns.map(function (column) {
			      return {column: column, value: row[column]};
			    });					
			  })
			  .enter()
			  .append('td')
					.attr("class", function (d,i) { return columns[i]; })
			    .html(function (d) { return d.value; });


					rows.selectAll("td.Sparkline")
											.selectAll(".spark")
											.data(function(d,i){ return [type[i]]; })
											.enter()
					            .append("svg")
					            .attr("class", "spark")
											.attr("height", 25)
											.attr("width", 200)
											.append("path")
											.attr("d", function(d,i){ d.line = this; return line(d.values); })
											.attr("stroke-width", 1)
											.attr("stroke", "#c00000")
											.attr("fill", "none");
																
		  return table;
};