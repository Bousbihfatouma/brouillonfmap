// Creation de la MAP de base
const map = L.map('map').setView([48.833, 2.333], 7);

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

// On récupère les markers dès le chargement de la page
updateMarkers();

// --------------------------

// Récupération des élements html
const modal = document.querySelector('#laModale');
const inputTitre = document.querySelector('#titre');
const inputDescription = document.querySelector('#description');

// La variable qui stockera les coordonnées au click
let selectedCoord;

// La fonction executée au click de la souris sur la map :
// On sauvegarde les coordonnées en mémoire,
// Puis on ouvre la modale
function onMapClick(e) {
    selectedCoord = e.latlng;
    modal.showModal();
}
map.on('click', onMapClick);

// Quand la modale se ferme, on ajoute le nouveau marker sur la map
modal.addEventListener('close', function () {
    console.log(modal.returnValue);
    if (modal.returnValue !== 'non') {
        // const newMarker = L.marker([selectedCoord.lat, selectedCoord.lng]).addTo(map);
        // newMarker.bindPopup("<strong>" + inputTitre.value + "</strong><p>" + inputDescription.value + "</p>");
        addMarker(inputTitre.value, inputDescription.value, selectedCoord);
    }
});