/* .js files add interaction to your website */
// Map initialization
var map = L.map('map').setView([51.505, -0.09], 13);

//OpenStreetMap tile layer
var openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
openStreetMap.addTo(map);