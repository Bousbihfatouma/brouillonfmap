# Etape 0 : Installation
Installer Node.js et MongoDB sur votre ordinateur

npm init -y

npm install express body-parser ejs mongodb --save

npm install nodemon --dev

Dans package.js, ajouter le script : "dev": "nodemon index.js"

# Etape 1 : Créer l'app express
Dans le fichier index.js :

// On importe express et body-parser

// On créé la variable qui va contenir notre app express

// On connect express et body-parser ensemble

// On dit à express de servir directement tous les fichiers du dossier public

// On connect express et le moteur de template ejs ensemble

// On créé la route qui va rendre la page d'accueil de notre site

// On ouvre le serveur

# Etape 2 : Créer la DB
Dans le fichier db.js :

// On importe mongodb

// On définie le lien de connexion de notre base de donnée

// On créé une nouvelle instance de MongoClient

// On définie le nom de notre base de donnée

// On définie la variable du client qui va nous permettre de communiquer avec notre base de donnée

// On connect et on fait les logs

// On exporte un objet avec à l'intérieur une méthode markers qui retourne un client qui permet de communiquer avec la collection 'markers'

# Etape 3 : Créer les routes api
Dans le fichier index.js :

// Importer le fichier db.js

// Créer la route qui retourne tous les markers présent dans la db

// Créer la route qui permet d'ajouter un nouveau marker dans la db

# Etape 4 : Créer notre front-end
Dans le fichier views/index.ejs et public/script.js :

// Importer leaflet en utilisant les CDN

// Importer le script.js dans notre fichier index.ejs

// Afficher la map

// Créer et appeler une fonction qui permet de récupérer les markers depuis notre DB en passant par la route qu'on a créé

```
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
```

// Créer la fonction qui permet d'ajouter un nouveau marker, cette fonction appelera la fonction `updateMarkers()` une fois que le nouveau marker a été sauvegardé en DB

```
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
```

// Récupérer les élements html nécessaires (modal, inputTitre, inputDescription)

// Créer une variable qui stockera les coordonnées au click

// Ecrire le code qui au clique de la souris, enregistre les coordonnées dans une variable et affiche la modale

// Quand la modale se ferme, on ajoute le nouveau marker sur la map (en appelant la fonction `addMarker(inputTitre.value, inputDescription.value, selectedCoord)`)