/*****************************************************************************
 *  Set up
 */
var svgHeight = window.innerHeight;
var svgWidth = window.innerWidth;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;


var svg = d3.select("body").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)


d3.select("#year_slider").on("change", function() {
  
  var newyear = d3.select("#year_slider").property("value");
  console.log(newyear)
  getPlots(newyear)

});


var change_x_values = function(values) {
  console.log(values)
}


function getPlots(selected_year, values) {
    // Get all plots for a particular ID

  d3.json("http://127.0.0.1:5000/api/v1.0/All").then(function (data) {
    // console.log(data);
    var filtered_year_data = data.filter( x => x.Year == selected_year)
    var country = [];
    var gdp = [];
    var happiness = [];
    var freedom = [];
    var trust = [];
    var health = [];
    var generosity = [];
    var family = [];
    // console.log(filtered_year_data);
    filtered_year_data.forEach(function (x) {
      country.push(x["country"]);
      gdp.push(+x["economy"]);
      happiness.push(+x["happiness_score"]);
      freedom.push(+x["freedom"]);
      trust.push(+x["trust"]);
      health.push(+x["health"]);
      generosity.push(+x["generosity"]);
      family.push(+x["family"]);
    });
    console.log(country);
    // console.log(gdp);
    // console.log(happiness);
    // console.log(freedom);
    // console.log(trust);
    // console.log(health);
    // console.log(generosity);

    var trace1 = {
      x: values,
      y: happiness,
      mode: "markers",
      marker: {
        size: happiness * 5,
        color: values,
      },

      text: {country, values}
    };

    var layout1 = {
      xaxis: { title: "Family" },
      yaxis: {title: "Happiness Score"},
      height: 500,
      width: 1000,
    };

    var data1 = [trace1];

    Plotly.newPlot("bubble", data1, layout1);
  });

}

function getdempographicsInfo(id){
    d3.json("http://127.0.0.1:5000/api/v1.0/All").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);

      var results = metadata.filter((meta) => meta.id.toString() === id)[0];
      console.log(results);
      var demoInfo = d3.select("#sample-metadata");

      demoInfo.html("");

      Object.entries(results).forEach((key) => {
        demoInfo.append("h5").text(key[0].toUpperCase() + ":" + key[1] + "\n");
      });
    });
}



function init(){
    // var dropdown = d3.select("#selDataset");
  getPlots(2015);
    
}

init();