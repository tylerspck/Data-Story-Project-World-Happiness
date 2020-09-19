//Regional js
var url = "http://localhost:5000/api/v1.0/All";
// svg container
var height = 400;
var width = 460;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};

// chart area minus margins
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg1 = d3
  .select("#East_Asia_Pacific")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

var svg2 = d3
  .select("#Europe_Central_Asia")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

var svg3 = d3
  .select("#Latin America_Caribbean")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

var svg4 = d3
  .select("#Middle East_North Africa")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

var svg5 = d3
  .select("#North America")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

var svg6 = d3
  .select("#South Asia")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

var svg7 = d3
  .select("#Sub-Saharan Africa")
  .append("svg")
  .attr("height", height)
  .attr("width", width);
// shift everything over by the margins
var chartGroup1 = svg1
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup2 = svg2
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup3 = svg3
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup4 = svg4
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup5 = svg5
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup6 = svg6
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup7 = svg7
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var xScale = d3.scaleBand().range([0, chartWidth]).padding(0.4);

var yScale = d3.scaleLinear().range([chartHeight, 0]);

function eastAsia(newyear, variable)  {
    d3.json(url).then( function(data, error){
        if (error) {
            throw error;
        }
        // chartGroup1.remove()
        var eastAsia = data.filter(x=>x.region == "East Asia & Pacific").filter(x=>x.Year == newyear)
        console.log(eastAsia)
        xScale.domain(eastAsia.map(function(d) { return d.country}));
        yScale.domain([0, d3.max(eastAsia, function(d) {return d.economy + 0.2})]);

        chartGroup1.append("g").attr("transform", "translate(0,"+chartHeight+")").call(d3.axisBottom(xScale)).selectAll("text").attr("transform", function(d) {
          return "rotate(-90)"
        });
        
        chartGroup1.append("g").call(d3.axisLeft(yScale))

        chartGroup1.selectAll(".bar").data(eastAsia).enter().append("rect").attr("class", "bar").attr("x", function(d) {return xScale(d.country); }).attr("y", function(d) {return yScale(d.economy); }).attr("width", xScale.bandwidth()).attr("height", function(d) {return chartHeight - yScale(d.economy);});
    })
}

function Euro(newyear)  {
    d3.json(url).then( function(data, error){
        if (error) {
            throw error;
        }
        // chartGroup2.remove()
        var Euro = data.filter(x=>x.region == "Europe & Central Asia").filter(x=>x.Year == newyear)
        console.log(Euro)
        xScale.domain(Euro.map(function(d) { return d.country}));
        yScale.domain([0, d3.max(Euro, function(d) {return d.economy})]);

        chartGroup2.append("g").attr("transform", "translate(0,"+chartHeight+")").call(d3.axisBottom(xScale)).selectAll("text").attr("transform", function(d) {
          return "rotate(-90)"
        });
        
        chartGroup2.append("g").call(d3.axisLeft(yScale))
    })
}


d3.select("#year_slider").on("change", function () {
  var newyear = d3.select("#year_slider").property("value");
  var factor = d3.selectAll(".active").property("value");
  eastAsia(newyear);
  Euro(newyear);

});

function init() {
  eastAsia(2015);
  Euro(2015);
}

init()