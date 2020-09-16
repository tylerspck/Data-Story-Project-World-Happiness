//define json URLs
var happinessURL ="http://localhost:5000/api/v1.0/2015"
var countryURL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"

//CREATEMAP start
//createMap with happiness, countries, and legend variables
function createMap(happiness, countries, legend) {
    // Create the tile layer that will be the light background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 10,
      id: "light-v10",
      accessToken: API_KEY
    });

    // Create the tile layer that will be the satellite background of our map
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    // Create the tile layer that will be the outdoors background of our map
    var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        id: "outdoors-v11",
        accessToken: API_KEY
    });
  
//baseMaps contains all background map options
  var baseMaps = {
    "Satellite Map": satellitemap,
    "Grayscale": lightmap,
    "Outdoors": outdoorsmap
};
//overlayMaps contains all marker options
  var overlayMaps = {
      "Happiness": happiness,
      "Countries": countries
  };

//myMap to combine layers
  var myMap = L.map("map", {
    center: [30, 0],
    zoom: 2,
    //start with satellitemap and both earthquakes and plates checked on
    layers: [satellitemap, happiness, countries]
  });
 
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap)
  legend.addTo(myMap)
};

d3.json(happinessURL,function(responseHappiness) {
	//nested fault lines
	d3.json(countryURL, function(data) {
	  //variable for country lines = countries
	  var countries = L.geoJson(data, {
		style: style,
		// onEachFeature: onEachFeature,

	})//.addTo(myMap);
	//var countries now contains countryURL geJson data
			
	//variable for quakeData features section = earthquakes
	var happiness = responseHappiness
	var happiness_score = happiness.happiness_score
	// Initialize an array to hold earthquake markers
	var happinessMarkers = []
  
	//choose circle and legend colors based on mag
	function chooseColor(happiness_score) {
	  switch (true) {
	  case happiness_score < 3:
		return "red";
	  case happiness_score < 4:
		return "darkorange";
	  case happiness_score < 5:
		return "orange";
	  case happiness_score < 6:
		return "yellow";
	  case happiness_score < 7:
		return "greenyellow";
	  default:
		return "green";
	  }
	 };

	 function style(feature) {
		return {
			fillColor: chooseColor(happiness_score),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.8
		};
	};

	function onEachFeature(feature, layer) {
		layer.bindTooltip("Country: " + happiness.country + "<br>Happiness: " + happiness_score + "<br>Region: " + happiness.region);
	}
  
  //Legend Time: control to add legend
  var legend = L.control({position: 'bottomright'});
  
  legend.onAdd = function (map) {
  //included supporting css for info, info h4, legend, and legend i; h/t https://leafletjs.com/examples/choropleth/
	var div = L.DomUtil.create('div', 'info legend'),
		happiness_score = [2, 3, 4, 5, 6, 7],
		labels = [];
	// loop through our magnitude intervals and generate a label with a colored square for each interval
	for (var i = 0; i < happiness_score.length; i++) {
		div.innerHTML +=
			'<i style="background:' + chooseColor(happiness_score[i] ) + '"></i> ' +
			happiness_score[i] + (happiness_score[i + 1] ? '&ndash;' + happiness_score[i + 1] + '<br>' : '+');
	}
	return div;
  };
  //Legend Time done
  //define earthquakes data 
		  // Loop through the earthquakes features array
		  for (var i = 0; i < happiness.length; i++) {
			var happy = happiness[i];
			//pull datetime
			// var datetime = earthquakes[i].properties.time;
			// //formate datetime as date for display in Popup
			// var date = new Date(datetime);
			// For each earthquake, create a circle and bind a popup with the earthquake's place and magnitued (mag)
			var happinessMarker = L.circle([happy.latitude, happy.longitude], {
				fillOpacity: 0.8,
			  //set circle outline to thin black
				color: "black",//alternative to have full color circles: chooseColor(earthquake.properties.mag),
				weight: 1,
				  //set the color based on the chooseColor function passing mag
				fillColor: chooseColor(happy.happiness_score),
				//set the radius to the magnitued times X for better display
				radius: (happy.happiness_score * 40000)
			})
			//tooltip popup includes href to URL with display name place, magnitude, and date
			  .bindPopup("<h3>" + happy.country + "</h3><h3>Happiness: " + happy.happiness_score + "</h3> Region: " + happy.region);
		
			// Add the marker to the earthquakeMarkers array
			happinessMarkers.push(happinessMarker);
		  }
	  //call createMap with layerGroup(earthquakeMarkers), var plates, and var legend
	  createMap(L.layerGroup(happinessMarkers), countries, legend);
	})
  });