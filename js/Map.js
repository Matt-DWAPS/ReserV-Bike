class Maps{
    constructor() {
        // Initialisation de la carte
        // Longitude, latitude
        // Zoom par défaut
        this.map = L.map('map').setView([48.852969, 2.349903], 13);

        // Chargement des tuiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 1,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // Création d'un marqueur avec popup, attribution de coordonnées, ajout du contenu html
        this.marker = L.marker([48.852969, 2.349903]).addTo(this.map)
            .bindPopup('Je suis ici !');

        //Icon du marqueur
        this.icone = L.icon({
            iconUrl: ('<i class="fas fa-biking"></i>'),
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        })
    }
}