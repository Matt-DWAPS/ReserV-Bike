    class Maps{
        constructor() {

            // Initialisation de la carte
            // Longitude, latitude
            // Zoom par défaut
            let map = L.map('map').setView([49.896032388592566, 2.295043974872919], 7);

            // Chargement des tuiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: 1,
                maxZoom: 20,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // //Icone du marqueur
            let icone = L.icon({
                iconUrl: "content/cycle.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [0, -50]
            })

            //Mise en place des tableaux de marqueurs
            let tableMarkers= [];

            //Mise en place de cluster pour le regroupement des marqueurs
            let markers = new L.MarkerClusterGroup();

            // Appel de l'API JCdecaux
            ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=0493aab02df05642794e4892baa98bfc20497511", function (reponse) {
                // Transforme la réponse en un tableau
                let allData = JSON.parse(reponse);
                allData.forEach((data) =>{
                    let marker = L.marker([data.position.lat, data.position.lng], {icon:icone}); //.addTo(map) inutile lors de l'utilisation de cluster
                    marker.bindPopup("<p>"+ data.name +"</p>");
                    markers.addLayer(marker); //Ajout du marqueur au groupe
                    //On ajoute le marqueur au tableau
                    tableMarkers.push(marker);
                    console.log(marker);
                });
                // On regroupe les marqueurs dans un groupe leaflet
                let group = new L.featureGroup(tableMarkers);

                //On adapte le zoom au groupe avec un padding de 0.4
                map.fitBounds(group.getBounds().pad(0.4))

                map.addLayer(markers); //Affichage des cluster lors du dezoom
            });
        }
    }