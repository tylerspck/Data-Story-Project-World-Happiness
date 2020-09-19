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
d3.json("http://localhost:5000/api/v1.0/All").then(function(data){
    console.log(data)

//     var gdp = []
//     var happiness = []
//     var freedom = []
//     var trust = []
//     var health = []
//     var generosity = []
//     var family = []
    
//    data.forEach(function(country) { 
//         gdp.push(+country["Economy(GDP_per_Capita)"]);
//         happiness.push(+country["Happiness_Score"]);
//         freedom.push(+country["Freedom"]);
//         trust.push(+country["Trust(Government_Corruption)"]);
//         health.push(+country["Health(Life_Expectancy)"]);
//         generosity.push(+country["Generosity"]);
//         family.push(+country["Family"]);
        
   

    var year2015 = []
    var year2016 = []
    var year2017 = []
    var year2018 = []
    var year2019 = []
    var year2020 = []
                // Average Happiness over the years Graph
    data.forEach(function(element){
        console.log(element.Year);
        if(element.Year === 2015){
            year2015.push(+element.happiness_score);
        }
        else if (element.Year === 2016){
            year2016.push(+element.happiness_score);
    }
        else if (element.Year === 2017) {
          year2017.push(+element.happiness_score);
        } else if (element.Year === 2018) {
          year2018.push(+element.happiness_score);
        } else if (element.Year === 2019) {
          year2019.push(+element.happiness_score);
        } else if (element.Year === 2020) {
          year2020.push(+element.happiness_score);
        }
    })
    var arrAvg2015 = year2015.reduce((a,b) => a + b, 0) / year2015.length;
    var arrAvg2016 = year2016.reduce((a,b) => a + b, 0) / year2016.length;
    var arrAvg2017= year2017.reduce((a,b) => a + b, 0) / year2017.length;
    var arrAvg2018 = year2018.reduce((a,b) => a + b, 0) / year2018.length;
    var arrAvg2019 = year2019.reduce((a,b) => a + b, 0) / year2019.length;
    var arrAvg2020 = year2020.reduce((a,b) => a + b, 0) / year2020.length;
    // console.log(year2015.reduce((a,b) => a + b, 0))
    console.log(arrAvg2015);
    console.log(year2015);



//    console.log(gdp);
//    console.log(happiness);
//    console.log(freedom);
//    console.log(trust);
//    console.log(health );
//    console.log(generosity);
      
//    if (factor ==='gdp'){
//         x_axis = gdp
//         x_tile = "Economy(GDP_per_Capita)"
//    }
//    else if (factor === 'freedom'){
//        x_axis = freedom
//        x_tile = "Freedom"
//    }
//    else if (factor === 'trust'){
//     x_axis = trust
//     x_tile = "Trust(Government_Corruption)"
//    }
//     else if (factor === 'health'){
//     x_axis = health
//     x_tile = "Health(Life_Expectancy)"
//     }
//     else if (factor === 'generosity'){
//     x_axis = generosity
//     x_tile = "Generosity"
//     }
//     else if (factor === 'family'){
//     x_axis = family
//     x_tile = "Family"
//     }

    // var trace1 = {
    //     x: x_axis,
    //     y: happiness,
    //     mode: "markers",
    //     marker: {
    //         size: happiness,
    //         color: gdp
    //     },
        
    //     text: gdp
    // };

    // var layout1 = {
    //     xaxis:{title:x_tile},
    //     height: 500,
    //     width: 1000
    // };

    // var data1 = [trace1];

    // Plotly.newPlot("bubble", data1,layout1);

    var trace2 = {
        x: [2015,2016,2017,2018,2019,2020],
        y: [arrAvg2015,arrAvg2016,arrAvg2017,arrAvg2018,arrAvg2019,arrAvg2020],
        mode: 'lines'
    }
    console.log([arrAvg2015,arrAvg2016,arrAvg2017,arrAvg2018,arrAvg2019,arrAvg2020]);
    var data2 = [trace2];

    var layout2 = {
        xaxis:{title:'Happiness over years'},
        height: 500,
        width: 1000
    }

    Plotly.newPlot("line", data2,layout2);

});

}


function init()
{
    // console.log('init')
    getPlots('gdp');
    
}

init();

var buttons = d3.selectAll(".button")
buttons.on('click', function(){
    // console.log('button clicked')
    getPlots(this.id)
})









 