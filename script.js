//import "./style.css";

// Map initialization
var map = L.map('map').setView([51.505, -0.09], 3);

//Google map tile layer

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 15,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);


function updateExternalPanel(properties) {
  const panel = document.getElementById('info-panel');
  panel.innerHTML = `
    <h2>${properties.cityName} <span style="font-size: 0.6em; color: #aaa;">(${properties.country})</span></h2>
    <hr style="border-color: #333; margin: 10px 0;">
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
}

// 3. New Step: Fetch the GeoJSON dynamically from your separate file
async function loadMapData() {
  try {
    // Fetch the file. Make sure cities.geojson is in the same folder as index.html
    const response = await fetch('./cities.geojson');
    const cityData = await response.json();

    // Now that we have the data, pass it to Leaflet
    L.geoJSON(cityData, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 10,
          fillColor: "#ff4757",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        });
      },
      onEachFeature: function (feature, layer) {
        layer.on('click', function () {
          updateExternalPanel(feature.properties);
          map.setView(layer.getLatLng(), 5);
        });
        
        layer.bindTooltip(feature.properties.cityName, {
          direction: 'top',
          offset: [0, -5]
        });
      }
    }).addTo(map);

  } catch (error) {
    console.error("Oops! Something went wrong loading the city data:", error);
  }
}

// Call the function to fire off the load request when page loads
loadMapData();