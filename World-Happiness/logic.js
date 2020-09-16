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

function getPlots(selected_year) {
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
    console.log(filtered_year_data);
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
      x: gdp,
      y: happiness,
      mode: "markers",
      marker: {
        size: happiness,
        color: gdp,
      },

      text: {country, gdp}
    };

    var layout1 = {
      xaxis: { title: "Economy(GDP_per_Capita)" },
      yaxis: {title: "Happiness Score"},
      height: 500,
      width: 1000,
    };

    var data1 = [trace1];

    Plotly.newPlot("bubble", data1, layout1);

    // var trace2 = {
    //   x: family,
    //   y: happiness,
    //   mode: "markers",
    //   marker: {
    //     size: happiness,
    //     color: family,
    //   },
    //   text: family,
    // };

    // var layout2 = {
    //   xaxis: { title: "Family" },
    //   height: 500,
    //   width: 1000,
    // };

    // var data2 = [trace2];
    // Plotly.newPlot("bubble", data2, layout2);

    // var trace3 = {
    //   x: health,
    //   y: happiness,
    //   mode: "markers",
    //   marker: {
    //     size: happiness,
    //     color: health,
    //   },
    //   text: health,
    // };

    // var layout3 = {
    //   xaxis: { title: "Health(Life_Expectancy)" },
    //   height: 500,
    //   width: 1000,
    // };

    // var data3 = [trace3];
    // Plotly.newPlot("bubble", data3, layout3);

    // var trace4 = {
    //   x: trust,
    //   y: happiness,
    //   mode: "markers",
    //   marker: {
    //     size: happiness,
    //     color: trust,
    //   },
    //   text: trust,
    // };

    // var layout4 = {
    //   xaxis: { title: "Trust(Government_Corruption)" },
    //   height: 500,
    //   width: 1000,
    // };

    // var data4 = [trace4];
    // Plotly.newPlot("bubble", data4, layout4);

    // var trace5 = {
    //   x: freedom,
    //   y: happiness,
    //   mode: "markers",
    //   marker: {
    //     size: happiness,
    //     color: freedom,
    //   },
    //   text: freedom,
    // };

    // var layout5 = {
    //   xaxis: { title: "Freedom " },
    //   height: 500,
    //   width: 1000,
    // };

    // var data5 = [trace5];
    // Plotly.newPlot("bubble", data5, layout5);

    // var trace6 = {
    //   x: generosity,
    //   y: happiness,
    //   mode: "markers",
    //   marker: {
    //     size: happiness,
    //     color: generosity,
    //   },
    //   text: generosity,
    // };

    // var layout6 = {
    //   xaxis: { title: "Generosity" },
    //   height: 500,
    //   width: 1000,
    // };

    // var data6 = [trace6];
    // Plotly.newPlot("bubble", data6, layout6); 
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