// Creation de la MAP de base
const map = L.map('map').setView([48.833, 2.333], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ------------------------------

// Ajout des markers depuis notre API interne
// Fonction qui sert à ajouter un marker dans la db
// Une fois que le marker est ajouté, on actualise la map
function addMarker(title, description, coord) {
    fetch('/marker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            coord: coord
        })
    })
    .then(function () {
        updateMarkers();
    })
    .catch(function (err) {
        console.error(err);
    })
}

// La fonction qui permet d'actualiser la map
// (éfface les markers actuels stocké dans la variable "markers")
// (récupération des markers depuis la db en passant par la route /markers)
// (sauvegarde de tous les markers dans la variable "markers")
// (puis affichage)
// à chaque nouveau marker, on fait un update avec les markers dans la DB, donc il faut effacer
// les markers affichés précédements
let markers = [];

function updateMarkers() {
    // Suppression des markers affichés précédements
    for (const marker of markers) {
        map.removeLayer(marker);
    }
    markers = [];

    // Récupération et affichage des nouveaux markers
    fetch('/markers')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            for (const item of data.markersList) {
                const marker = L.marker([item.coord.lat, item.coord.lng]);
                marker.addTo(map);
                marker.bindPopup("<strong>" + item.title + "</strong><p>" + item.description + "</p>");
                markers.push(marker);
            }
        });
}








// créer une icône personnalisée pour un restaurant végétarien sans gluten
var veggieIcon = L.icon({
    iconUrl: 'veggie-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35]
});

// créer une icône personnalisée pour un restaurant diététique
var dietIcon = L.icon({
    iconUrl: 'diet-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35]
});

// ajouter un marqueur pour un restaurant végétarien sans gluten
var veggieMarker = L.marker([48.857, 2.347], {icon: veggieIcon}).addTo(mymap);
veggieMarker.bindPopup("Restaurant végétarien sans gluten");

// ajouter un marqueur pour un restaurant diététique
var dietMarker = L.marker([48.859, 2.337], {icon: dietIcon}).addTo(mymap);
dietMarker.bindPopup("Restaurant diététique");
