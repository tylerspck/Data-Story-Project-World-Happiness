 
function createMap(earthquakes_week, earthquakes_day, earthquakes_hour, heat, plates, legend) {
    // Create a baseMaps object to hold the lightmap layer
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY,
        crossOrigin: true,
    });

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 256,
        maxZoom: 18,
        // zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });
    

    var overlayMaps = {
        "Past Week's Earthquakes": earthquakes_week,
        "Past Day's Earthquakes": earthquakes_day,
        "Past Hour's Earthquakes": earthquakes_hour,
        "Tectonic Lines": plates,
        "HeatMap": heat
    };
    // Create the map object with options
    var baseMaps = {
        "Light Map": light,
        "Street": streetmap,
        "Dark Map": darkmap
    };

    var mymap = L.map("map", {
        center: [37.0902, -98.5795],
        zoom: 4,
        layers: [light, earthquakes_week]
    });
   
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(mymap)
    legend.addTo(mymap)
    
}

function createEQMarkers(response) {
    
}



var weekurl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var plateurl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
var hoururl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
var dayurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson"
d3.json(hoururl,function(responsehour) {        
    d3.json(dayurl, function(responseday) {
        d3.json(weekurl, function(responseweek) {
            d3.json(plateurl, function(data) {
                var plates = L.geoJson(data, {
                    // Style each feature (in this case a neighborhood)
                    style: function (feature) {
                        return {
                            color: "black",
                            // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                            fillColor: "none",
                            fillOpacity: 0.5,
                            weight: 1.5
                        };
                    }
                })
            

                var week = responseweek.features
                var day = responseday.features
                var hour = responsehour.features
                console.log(data)
                var EQMarkersweek = []
                var EQMarkersday = []
                var EQMarkershour = []

                function chooseColor(magnitude) {
                    return magnitude < 1 ? "green" :
                        magnitude < 2 ? "#90EE90" :
                            magnitude < 3 ? "yellow" :
                                magnitude < 4 ? "orange" :
                                    magnitude < 5 ? "#FF4500" :
                                        "red";

                }

                var legend = L.control({ position: 'bottomleft' });

                legend.onAdd = function () {
                    var div = L.DomUtil.create('div', 'info legend')
                    var grades = [0, 1, 2, 3, 4, 5];

                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML += '<i style=background:' + chooseColor(grades[i]) + ';></i >' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                    }
                    return div;
                };


                for (var i = 0; i < week.length; i++) {
                    var cords = week[i].geometry;
                    var mag = week[i].properties
                    var datetime = mag.time 
                    var date = new Date(datetime)
                    var EQMarker = L.circle([cords.coordinates[1], cords.coordinates[0]], {
                        stroke: true,
                        weight: .3,
                        fillOpacity: 0.4,
                        color: "black",
                        fillColor: chooseColor(mag.mag),
                        radius: mag.mag * 35000
                    }).bindPopup("<h3> Location: " + mag.place + "<h3> Magnitude: " + mag.mag + "<h3> Date: " + date + "<h3>");

                    EQMarkersweek.push(EQMarker);
                    // console.log(cords.coordinates[1])

                }

                for (var i = 0; i < hour.length; i++) {
                    var cords = hour[i].geometry;
                    var mag = hour[i].properties
                    var datetime = mag.time
                    var date = new Date(datetime)

                    var EQMarkerhour = L.circle([cords.coordinates[1], cords.coordinates[0]], {
                        stroke: true,
                        weight: .3,
                        fillOpacity: 0.4,
                        color: "black",
                        fillColor: chooseColor(mag.mag),
                        radius: mag.mag * 35000
                    }).bindPopup("<h3> Location: " + mag.place + "<h3> Magnitude: " + mag.mag + "<h3> Date: " + date + "<h3>");

                    EQMarkershour.push(EQMarkerhour);
                    // console.log(cords.coordinates[1])
                }

                for (var i = 0; i < day.length; i++) {
                    var cords = day[i].geometry;
                    var mag = day[i].properties
                    var datetime = mag.time
                    var date = new Date(datetime)

                    var EQMarkerday = L.circle([cords.coordinates[1], cords.coordinates[0]], {
                        stroke: true,
                        weight: .3,
                        fillOpacity: 0.4,
                        color: "black",
                        fillColor: chooseColor(mag.mag),
                        radius: mag.mag * 35000
                    }).bindPopup("<h3> Location: " + mag.place + "<h3> Magnitude: " + mag.mag + "<h3> Date: " + date + "<h3>");

                    EQMarkersday.push(EQMarkerday);
                    // console.log(cords.coordinates[1])
                }

                var heatArray = [];

                for (var i = 0; i < week.length; i++) {
                    var location = week[i].geometry;

                    if (location) {
                        heatArray.push([location.coordinates[1], location.coordinates[0]]);
                    }
                }

                var heat = L.heatLayer(heatArray, {
                    radius: 35,
                    blur: 35,
                    gradient: { .05: "yellow", .1: "orange", .15: "red" }
                });
                

            
                // console.log(EQMarkers)
                createMap(L.layerGroup(EQMarkersweek), L.layerGroup(EQMarkersday), L.layerGroup(EQMarkershour), heat, plates, legend)

            })
        })
    })
})







