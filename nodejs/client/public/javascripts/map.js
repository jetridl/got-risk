var map = L.map('map', {
    crs: L.CRS.Simple,
    zoomControl: false
  });

  //var bounds = [[0,0], [1488,1000]];
  const bounds = [[0, 0], [744, 500]];
  var image = L.imageOverlay('images/westeros.jpg', bounds).addTo(map);
  map.fitBounds(bounds);

  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  drawOptions = {
    draw: {
      polygon: {
        shapeOptions: {
          color: 'purple'
        },
        icon: new L.DivIcon({
          iconSize: new L.Point(4, 4),
          className: 'leaflet-div-icon leaflet-editing-icon'
        })
      },
      polyline: {
        shapeOptions: {
          color: 'red'
        },
        icon: new L.DivIcon({
          iconSize: new L.Point(8, 8),
          className: 'leaflet-div-icon leaflet-editing-icon'
        }),
        //touchIcon: new L.DivIcon({
        //  iconSize: new L.Point(20, 20),
        //  className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
        //}),
        showLength: false
      },
      rect: {
        shapeOptions: {
          color: 'green'
        }
      },
      circle: {
        shapeOptions: {
          color: 'steelblue'
        }
      }
    },
    edit: {
      featureGroup: drawnItems
    }
  };
  var drawControl = new L.Control.Draw(drawOptions);
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
  });

  // on click, clear all layers
  document.getElementById('delete').onclick = function(e) {
    drawnItems.clearLayers();
  };

  document.getElementById('export').onclick = function(e) {
    // Extract GeoJson from drawnItems
    var data = drawnItems.toGeoJSON();
    filename = document.getElementById('textbox').value;
    filename = filename + '.geojson';

    // Stringify the GeoJson
    var convertedData =
      'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    // Create export
    document
      .getElementById('export')
      .setAttribute('href', 'data:' + convertedData);
    document.getElementById('export').setAttribute('download', filename);
  };

  let currentFeature;

  function clickTerritory(e){

    var layer = e.target;
    console.log(layer.feature.properties.layerID)
    if (layer != currentFeature){
      highlightFeature(layer)
    } else {
      deHighlightFeature(layer)
    }
  }
  function highlightFeature(layer) {

    if (currentFeature){
      currentFeature.setStyle(highlighted)
    }

    layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });
      currentFeature = layer
  }

  function deHighlightFeature(layer){
      layer.setStyle(highlighted);
      currentFeature = null
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
      //layer.feature.properties.layerID = "hello"
      layer.on({
          click: clickTerritory,
      });
  }

  var highlighted = {
    "color": "#1199FF",
    "weight": 1,
    "opacity": 0,
    "fillOpacity": 0
  };

  async function getGeoJson(path){
    return await new L.GeoJSON.AJAX('territories/'+ westeros[i].id +'.geojson',{
      style: highlighted,
      onEachFeature: onEachFeature
    });

  }
  let data
  $.getJSON('data/westeros.json', function(westeros) {
    for (var i=0; i<westeros.length; i++) {
        var geojsonLayer = new L.GeoJSON.AJAX('territories/'+ westeros[i].id +'.geojson',{
          style: highlighted,
          onEachFeature: onEachFeature
        });
        geojsonLayer.addTo(map);
      //  console.log(geojsonLayer)
        geojsonLayer.eachLayer(function (layer) {
        //  layer.feature.properties.layerID = westeros[i].id;
          //layer._path.id = 'id' + westeros[i].id;
          //console.log(layer)
        });
        //geojsonLayer._leaflet_id = westeros[i].id
        //var id = parseInt(geojsonLayer._leaflet_id)+1
      //  geojsonLayer._layers.feature.properties.layerID = westeros[i].id
        //console.log(geojsonLayer._layers)
        data = westeros
    }
   });

//   var sol = L.latLng([744, 500]);
//   L.marker(sol).addTo(map);
