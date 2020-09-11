// var countryInfo,
var swarmSVG,
    scaleArea;

function areaToRadius(area) {
    let radius = Math.sqrt(area); //not gonna worry about diving by Pi
    return radius;
}

function initSwarmPlot() {
    //start with all of the country info
    //everywhere it says happiness_score in the bottom can be replaced by something else
    var data = countryInfo;
    var parameter = DIMENSIONS_SCORE[0].column_name;

    var margin = { top: 40, right: 40, bottom: 40, left: 10 },
        width = swarmSVG.attr("width") - margin.left - margin.right,
        height = swarmSVG.attr("height") - margin.top - margin.bottom;

    var formatValue = d3.format(".3f");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var g = swarmSVG
        .append("g")
        .attr("class", "parent-group")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(d) { return d[parameter]; }));



    scaleArea = d3.scaleLinear()
        .range([20, 1000])
        .domain(d3.extent(data, function(d) { return d.Population; }));

    console.log(areaToRadius(scaleArea(1000000)));
    console.log(areaToRadius(scaleArea(50000000)));
    console.log(areaToRadius(scaleArea(100000000)));

    var simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(function(d) { return x(d[parameter]); }).strength(1))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(function(d) {
            let area = scaleArea(d.Population);
            return areaToRadius(area) + 2;
        }))
        .stop();

    for (var i = 0; i < 120; ++i) simulation.tick();

    console.log(data);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisTop(x)
            .ticks(10, ".2f")
            .tickSize(height));

    var cell = g.append("g")
        .attr("class", "cells")
        .selectAll("g").data(d3.voronoi()
            .extent([
                [-margin.left, -margin.top],
                [width + margin.right, height + margin.top]
            ])
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .polygons(data)).enter().append("g");

    cell.append("circle")
        .attr("r", function(d) {
            var area = scaleArea(d.data.Population);
            let radius = areaToRadius(area);
            return radius;
        })
        .attr("cx", function(d) { return d.data.x; })
        .attr("cy", function(d) { return d.data.y; })
        .style("fill", function(d) {
            return continentToColor(d.data.Continent);
        });

    cell.append("path")
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

    cell.append("title")
        .text(function(d) { return d.data.Country + "\n" + d.data.Continent + "\n" + formatValue(d.data.Happiness_Score); });
}

function updateSwarmPlot(parameter) {
    //should be key of the parameter to change
    console.log(parameter);
    var data = countryInfo;

    var margin = { top: 40, right: 40, bottom: 40, left: 10 },
        width = swarmSVG
        .attr("width") - margin.left - margin.right,
        height = swarmSVG
        .attr("height") - margin.top - margin.bottom;

    var formatValue = d3.format(".3f");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);
    x.domain(d3.extent(data, function(d) { return d[parameter]; }));

    scaleArea = d3.scaleLinear()
        .range([20, 1000])
        .domain(d3.extent(data, function(d) { return d.Population; }));

    var simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(function(d) { return x(d[parameter]); }).strength(1))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(function(d) {
            let area = scaleArea(d.Population);
            return areaToRadius(area) + 2;
        }))
        .stop();
    for (var i = 0; i < 120; ++i) simulation.tick();

    var g = swarmSVG
        .select(".parent-group");

    var cell = g.select(".cells")
        .selectAll("g").data(d3.voronoi()
            .extent([
                [-margin.left, -margin.top],
                [width + margin.right, height + margin.top]
            ])
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .polygons(data));

    g.select(".axis--x")
        .transition()
        .duration(TRANSITION_DURATION)
        .call(d3.axisTop(x)
            .ticks(10, ".2f")
            .tickSize(height));

    cell.select("circle")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("cx", function(d) { return d.data.x; })
        .attr("cy", function(d) { return d.data.y; });

    cell.select("path")
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

    cell.select("title")
        .text(function(d) { return d.data.Country + "\n" + d.data.Continent + "\n" + formatValue(d.data[parameter]); });
}

function handleSwarmParameterChange(param) {
    updateSwarmPlot(param);
}




/*****************************************************************************
 * Event Handlers
 */

$('#swarm-parameter-select').on('select2:select', function (e) {
    var param = e.params.data.id;
    handleSwarmParameterChange(param);
});