//import "./style.css";

// Map initialization
var map = L.map('map').setView([51.505, -0.09], 3);

//Google map tile layer

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);