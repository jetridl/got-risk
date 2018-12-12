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
  
//   var geojsonLayer = new L.GeoJSON.AJAX('territories/skagos.geojson');
//   geojsonLayer.addTo(map);
//   var geojsonLayer = new L.GeoJSON.AJAX('territories/karhold.geojson');
//   geojsonLayer.addTo(map);
  
//   $.getJSON('data/westeros.json', function(json) {
//     console.log(json); // this will show the info it in firebug console
//   });
//   var sol = L.latLng([744, 500]);
//   L.marker(sol).addTo(map);