    class Maps{
        constructor() {
            // Initialisation de la carte
            // Longitude, latitude
            // Zoom par défaut
            this.map = L.map('map').setView([48.852969, 2.349903], 7);

            // Chargement des tuiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: 1,
                maxZoom: 20,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            //Création des marqueurs pour les villes
            this.villes = {
                "Paris": { "lat": 48.852969, "lon": 2.349903 },
                "Brest": { "lat": 48.383, "lon": -4.500 },
                "Quimper": { "lat": 48.000, "lon": -4.100 },
                "Bayonne": { "lat": 43.500, "lon": -1.467 }
            };

            //Mise en place des tableaux de marqueurs
            this.tableMarkers= [];


            //Mise en place de cluster pour le regroupement des marqueurs
            this.markers = new L.MarkerClusterGroup();
            this.markers.addLayer(L.marker([175.3107, -37.7784]));
            // add more markers here...
            this.map.addLayer(this.markers);

            //Icone du marqueur
            this.icone = L.icon({
                iconUrl: "content/cycle.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [0, -50]
            })

            // Création d'un marqueur avec popup, attribution de coordonnées, ajout du contenu html
            let ville;
            //On parcourt les différentes villes du tableau
            for(ville in this.villes){
                this.marker = L.marker([this.villes[ville].lat, this.villes[ville].lon], {icon:this.icone})//.addTo(this.map) Inutile lors de l'utilisation de cluster
                    .bindPopup("<h3>"+ville+"</h3>");
                this.markers.addLayer(this.marker);

                // On ajoute le marqueur au tableau
                this.tableMarkers.push(this.marker);
            }
            //On regroupe les marqueurs dans le tableau
            this.group = new L.featureGroup(this.tableMarkers);

            //On adapte le zoom au groupe créer afin d'afficher l'ensemble des markers lors du chargement de la carte et on y ajoute un padding de 0.4 pour eviter le crop des icones
            this.map.fitBounds(this.group.getBounds().pad(0.4))

            this.map.addLayers(this.markers);
        }
    }