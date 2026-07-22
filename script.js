//import "./style.css";

// Map initialization
var map = L.map('map').setView([51.505, -0.09], 3);

//Google map tile layer

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 15,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);

// 2. Load city data from a GeoJSON FeatureCollection
fetch('cities.json')
  .then(function(res) {
      if (!res.ok) {
        throw new Error('HTTP ' + res.status);
      }
      return res.json();
    })
  .then(function(geojson) {
    L.geoJSON(geojson, {
      // GeoJSON coordinates are [lng, lat] — Leaflet handles the conversion
      // automatically here, so we don't need to flip them ourselves.
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff4757",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        });
      },
      onEachFeature: function(feature, layer) {
        layer.on('click', function() {
          return openPanel(feature.properties);
        });
      }
    }).addTo(map);
  });


// 3. Functions that control the external HTML/CSS panel
function openPanel(properties) {
  var panel = document.getElementById('info-panel');

  panel.innerHTML =`
    <h2>${properties.cityName} <span style="font-size: 0.6em; color: #aaa;">(${properties.country})</span></h2>
    <hr style="border-color: #333; margin: 15px 0;">
    <div>
      <strong>Annual Footprint:</strong>
      <div class="stat-badge">${properties.footprint} per capita</div>
    </div>
    <p><strong>Primary Consumer Driver:</strong><br> ${properties.primaryDriver}</p>
    <div style="background: #2b2b2b; padding: 12px; border-radius: 4px; font-size: 0.9em; line-height: 1.4;">
      <strong>Did you know?</strong><br>
      ${properties.fact}
    </div>
  `;

  //panel.classList.add('open');
}

function closePanel() {
  document.getElementById('info-panel').classList.remove('open');
}

