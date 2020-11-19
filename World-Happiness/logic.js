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

function getplots(factor, newyear) {
d3.json("http://127.0.0.1:5000/api/v1.0/All").then(function (data) {
    // console.log(data);
    var filtered_year_data = data.filter(x => x.Year == newyear)
    var gdp = []
    var country = []
    var happiness = []
    var freedom = []
    var trust = []
    var health = []
    var generosity = []
    var family = []
    
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
//    console.log(gdp);
//    console.log(happiness);
//    console.log(freedom);
//    console.log(trust);
//    console.log(health);
//    console.log(generosity);

var x_axis
var x_tile

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
    // console.log(happiness)
    // console.log(x_axis)
    // console.log(country)
    var trace1 = {
      x: x_axis,
      y: happiness,
      text: country,
      type: "scatter",
      mode: "markers",
      marker: {
        size: happiness,
        color: x_axis,
      },
      hovertemplate: 
        `<br><b>Country</b>: ${country}` +
        `<br><b>Happiness Score</b>: ${happiness}` +
        `<br><b>${x_tile}: ${x_axis}</b>`,

      // `<br><b>Happiness Score</b>: ${happiness}` + `<br><b>${x_tile}: ${x_axis}</b>`
    };

    // trace.push({
    //   x: xValueList,
    //   y: yValueList,
    //   mode: "markers",
    //   type: "scatter",
    //   text: textList,
    //   showlegend: true,
    //   name: "trace-" + label,
    // });


    var layout1 = {
        xaxis:{title: x_tile},
        hoverlabel: {
            bgcolor: '#fff'
        },
        // hovermode: "closest",
        height: 500,
        width: 1000
    };

    var data1 = [trace1];

    Plotly.newPlot("bubble", data1,layout1);


});
}


d3.selectAll(".button").on('click', function () {
    console.log('button clicked')
    var btnContainer = document.getElementById("metric_selector");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("button");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
    var factor = this.value
    var newyear = d3.select("#year_slider").property("value");
    // console.log(factor)
    getplots(factor, newyear)
})


d3.select("#year_slider").on("change", function () {
    var newyear = d3.select("#year_slider").property("value");
    var factor = d3.selectAll(".active").property("value");
    console.log(factor)
    getplots(factor, newyear)

});

function init() {
    getplots("gdp", 2015)
};

init()

