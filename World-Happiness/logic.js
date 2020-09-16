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

function getPlots() {
    // Get all plots for a particular ID

d3.csv("data/merged_dataset.csv").then(function(data){
    console.log(data)
//     var ids = data.custom.geo[0].otu_ids;
//     console.log(ids)
//     var samplevalues = data.custom.geo[0].sample_values.slice(0,10).reverse();
//     console.log(samplevalues)
//     var otulabels = data.custom.geo[0].otu_labels.slice(0,10);
//     console.log(otulabels)
//     var otu_top = (data.custom.geo[0].otu_ids.slice(0,10)).reverse();
//     console.log(otu_top)
    
    // var otu_id = otu_top.map(d => "otu" + d);
    // console.log(`OTU IDS: ${otu_id}`)
    // var otulabels = data.custom.geo[0].otu_labels.slice(0,10);
    // console.log(`OTU Labels: ${otulabels}`)
    
    
    // var trace = {
    //     x: samplevalues,
    //     y: otu_id,
    //     hovertemplate: otulabels,
    //     marker: {
    //     color: 'blue'},
    //     type: "bar",
    //     orientation: "h",
    // };

    // var data_trace1 = [trace];

   
    // var layout ={
    //     title: "Top 10 OTU",
    //     yaxis:{
    //         tickmode:"linear",
    //     },
    //     margin: {
    //         l: 100,
    //         r: 100,
    //         t: 100,
    //         b: 40

    //     }
    // };
    // Plotly.newPlot("bar", data_trace1, layout);

    // console.log("Before bubble");
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
      

    var trace1 = {
        x: gdp,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color: gdp
        },
        
        text: gdp
    };

    var layout1 = {
        xaxis:{title:"Economy(GDP_per_Capita)"},
        height: 500,
        width: 1000
    };

    var data1 = [trace1];

    Plotly.newPlot("bubble", data1,layout1);

    var trace2 = {
        x: family,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color:family
        },
        text: family
    };

    var layout2 = {
        xaxis:{title:"Family"},
        height: 500,
        width: 1000
    };

    var data2 = [trace2];
    Plotly.newPlot("bubble", data2,layout2);

    var trace3= {
        x: health ,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color: health 
        },
        text: health 
    };

    var layout3 = {
        xaxis:{title:"Health(Life_Expectancy)"},
        height: 500,
        width: 1000
    };

    var data3 = [trace3];
    Plotly.newPlot("bubble", data3,layout3);

    var trace4= {
        x: trust ,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color: trust 
        },
        text: trust
    };

    var layout4= {
        xaxis:{title:"Trust(Government_Corruption)"},
        height: 500,
        width: 1000
    };

    var data4 = [trace4];
    Plotly.newPlot("bubble", data4,layout4);


    var trace5= {
        x: freedom ,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color: freedom 
        },
        text: freedom 
    };

    var layout5= {
        xaxis:{title:"Freedom "},
        height: 500,
        width: 1000
    };

    var data5 = [trace5];
    Plotly.newPlot("bubble", data5,layout5);

    var trace6= {
        x: generosity ,
        y: happiness,
        mode: "markers",
        marker: {
            size: happiness,
            color: generosity 
        },
        text: generosity 
    };

    var layout6= {
        xaxis:{title:"Generosity"},
        height: 500,
        width: 1000
    };

    var data6 = [trace6];
    Plotly.newPlot("bubble", data6,layout6);


});

}

function getdempographicsInfo(id){
    d3.csv("data/merged_dataset.csv").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        var results = metadata.filter(meta => meta.id.toString()===id)[0];
        console.log(results);
        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");

        Object.entries(results).forEach((key)=> {
            demoInfo.append("h5").text(key[0].toUpperCase() + ":" + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    
    getdempographicsInfo(id);
    gaugeChart(id)
}

function init()
{
    // var dropdown = d3.select("#selDataset");
    var buttons = d3.select("# metric_selector");
    getPlots();
    d3.csv("data/merged_dataset.csv").then((data)=> {
        console.log(data)
    
        data.gdp.forEach(function(gdp) { 
            buttons.append("button").text(gdp).property("value")
            .on("mouseover", function(d){
                d3.select(this)
                .style("background", "orange")
            })
        });




        // data.names.forEach(function(name) { 
        //     dropdown.append("option").text(name).property("value");
        // });

        getPlots(data.names[0]);
        getdempographicsInfo(data.names[0]);
    });
}

init();

