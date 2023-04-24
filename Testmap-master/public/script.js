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



   
    // Définir les coordonnées et les titres des marqueurs pour chaque type de restaurant
    const restaurantsVegan = [
      { coords: [48.8606, 2.3522], title: 'Restaurant Vegan 1' },
      { coords: [48.8576, 2.3522], title: 'Restaurant Vegan 2' },
      // Ajouter plus de marqueurs pour les restaurants vegans
    ];

    const restaurantsSansGluten = [
      { coords: [48.8586, 2.3522], title: 'Restaurant Sans Gluten 1' },
      { coords: [48.8556, 2.3522], title: 'Restaurant Sans Gluten 2' },
      // Ajouter plus de marqueurs pour les restaurants sans gluten
    ];

    const restaurantsDiet = [
      { coords: [48.8596, 2.3522], title: 'Restaurant Diet 1' },
      { coords: [48.8546, 2.3522], title: 'Restaurant Diet 2' },
      // Ajouter plus de marqueurs pour les restaurants diet
    ];

    // Fonction pour ajouter les marqueurs sur la carte
    function addMarkersToMap(restaurants, options) {
      restaurants.forEach(restaurant => {
        L.marker(restaurant.coords, options)
          .bindPopup(restaurant.title)
          .addTo(map);
      });
    }

    const btnVegan = document.querySelector('.btn-vegan');
    const btnSansGluten = document.querySelector('.btn-sans-gluten');
    const btnDiet = document.querySelector('.btn-diet');

       // Ecouteur d'événement de clic pour le bouton "Restaurant Vegan"
    btnVegan.addEventListener('click', () => {
      // Supprimer les marqueurs existants de la carte
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Ajouter les marqueurs des restaurants vegans sur la carte
      addMarkersToMap(restaurantsVegan, { icon: veganIcon });
    });

    // Ecouteur d'événement de clic pour le bouton "Restaurant Sans Gluten"
    btnSansGluten.addEventListener('click', () => {
      // Supprimer les marqueurs existants de la carte
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Ajouter les marqueurs des restaurants sans gluten sur la carte
      addMarkersToMap(restaurantsSansGluten);
    });

    // Ecouteur d'événement de clic pour le bouton "Restaurant Diet"
    btnDiet.addEventListener('click', () => {
      // Supprimer les marqueurs existants de la carte
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Ajouter les marqueurs des restaurants diet sur la carte
      addMarkersToMap(restaurantsDiet);
    });
 
const restaurantVegan = [
  { lat: 48.8566, lon: 2.3522, title: "Restaurant Vegan 1" },
  { lat: 48.8567, lon: 2.3523, title: "Restaurant Vegan 2" },
  // ...
];

// Création de l'icône personnalisée pour le marqueur vegan
const veganIcon = L.icon({
  iconUrl: '/img/veggie-icon.png', // Chemin vers le fichier PNG de l'icône
  iconSize: [50, 50], // Taille de l'icône
});

// Création d'un marqueur vegan avec l'icône personnalisée

 /*const markerVegan = L.marker([48.8566, 2.3522], { icon: veganIcon })
   .addTo(map) // Ajout du marqueur à la carte
   .bindPopup('Restaurant Vegan 1'); // Ajout d'une info-bulle au marqueur*/


