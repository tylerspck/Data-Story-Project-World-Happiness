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

function getPlots(factor) {
    // Get all plots for a particular ID
console.log('building plot')
d3.csv("data/merged_dataset.csv").then(function(data){
    console.log(data)

    var gdp = []
    var happiness = []
    var freedom = []
    var trust = []
    var health = []
    var generosity = []
    var family = []
    
   data.forEach(function(country) { 
        gdp.push(+country["Economy(GDP_per_Capita)"]);
        happiness.push(+country["Happiness_Score"]);
        freedom.push(+country["Freedom"]);
        trust.push(+country["Trust(Government_Corruption)"]);
        health.push(+country["Health(Life_Expectancy)"]);
        generosity.push(+country["Generosity"]);
        family.push(+country["Family"]);
        
   })
   console.log(gdp);
   console.log(happiness);
   console.log(freedom);
   console.log(trust);
   console.log(health );
   console.log(generosity);
      
   if (factor ==='gdp'){
        x_axis = gdp
        x_tile = "Economy(GDP_per_Capita)"
   }
   else if (factor === 'freedom'){
       x_axis = freedom
       x_tile = "Freedom"
   }
   else if (factor === 'trust'){
    x_axis = trust
    x_tile = "Trust(Government_Corruption)"
   }
    else if (factor === 'health'){
    x_axis = health
    x_tile = "Health(Life_Expectancy)"
    }
    else if (factor === 'generosity'){
    x_axis = generosity
    x_tile = "Generosity"
    }
    else if (factor === 'family'){
    x_axis = family
    x_tile = "Family"
    }

    var trace1 = {
        x: x_axis,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color: gdp
        },
        
        text: gdp
    };

    var layout1 = {
        xaxis:{title:x_tile},
        height: 500,
        width: 1000
    };

    var data1 = [trace1];

    Plotly.newPlot("bubble", data1,layout1);


});

}

function init()
{
    console.log('init')
    getPlots('gdp');
    
}

init();

var buttons = d3.selectAll(".button")
buttons.on('click', function(){
    console.log('button clicked')
    getPlots(this.id)
})


  