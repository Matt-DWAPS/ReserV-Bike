class Map {


    constructor() {

        // Initialisation de la carte, Longitude, latitude, api
        this.map = L.map('map').setView([49.896032388592566, 2.295043974872919], 7);
        this.minZoom = 14;
        this.maxZoom = 20;
        this.apiKey = "https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=0493aab02df05642794e4892baa98bfc20497511";


        // Chargement des tuiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: this.minZoom,// Zoom par défaut
            maxZoom: this.maxZoom,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.stationObject = { // création de l'objet station
            init: function (name, address, positionlat, positionlng, status, bikestands, availableBS, availableB, lastupdate) {
                this.name = name;
                this.address = address;
                this.position = {
                    lat: positionlat,
                    lng: positionlng
                };
                this.status = status;
                this.bike_stands = bikestands;
                this.available_bike_stands = availableBS;
                this.available_bikes = availableB;
                this.last_update = lastupdate;
            }
        };

        // //Icone du marqueur
        this.greenIcon =
            L.icon({
                iconUrl: "content/cycle_open.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [0, -50]
            })

        this.redIcon =
            L.icon({
                iconUrl: "content/cycle_close.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [0, -50]
            })

        this.orangeIcon =
            L.icon({
                iconUrl: "content/cycle_medium.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [0, -50]
            })


        // Appel de l'API JCdecaux
        ajaxGet(this.apiKey, function (reponse) {
            // Transforme la réponse en un tableau
            let allStations = JSON.parse(reponse);

            for (let station of allStations){
                let newStation = Object.create(mymap.stationObject);

                newStation.init(station.name, station.address, station.position.lat, station.position.lng, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes, station.last_update);

                let iconBase = mymap.greenIcon;

                if (newStation.status === "OPEN"){
                    newStation.status = " OUVERT";
                    if (newStation.available_bikes < 10) { // moins de 10 places restantes, il devient orange
                        iconBase = mymap.orangeIcon;
                        if (newStation.available_bikes === 0) { // à 0, il devient rouge
                            iconBase = mymap.redIcon;
                        }
                    }
                } else {
                    newStation.status = " FERMEE";
                    newStation.available_bikes = 0;
                }
                let marker = L.marker([newStation.position.lat, newStation.position.lng], {icon: iconBase}).addTo(mymap.map)
                marker.bindPopup("<p>" + station.name + "</p>"+"<p>" + station.address + "</p>");


                //Au click hors station vide les champs
                mymap.map.addEventListener("click", deselectStation)

                function deselectStation(){
                    $('#info_reserv h4').html('Veuillez selectionner votre station');
                    $('#info_reserv p').html('');
                    document.getElementById("reservation_form").style.display= "none";
                    document.getElementById("info_reserv").style.display= "block";
                    document.getElementById("container_pre_reserv").style.display= "none";
                }

                //Au click sur une station ajoute les infos la concernant
                marker.addEventListener("click", selectStation);

                function selectStation(){
                    if (newStation.status === " FERMEE"){
                        let button_reserv = document.getElementById("pre_reserv");
                        button_reserv.disabled = true;
                        button_reserv.value = "Station fermée";
                    }
                    document.getElementById("info_reserv").style.display= "block";
                    document.getElementById("container_pre_reserv").style.display= "block";
                    document.getElementById("reservation_form").style.display= "none";
                    document.getElementById("title_station").innerHTML = "Station";
                    document.getElementById("name_station").innerHTML = newStation.name;
                    document.getElementById("address_station").innerHTML = newStation.address;
                    document.getElementById("status_station").innerHTML = "Actuellement : " + newStation.status;
                    document.getElementById("disponibility_bike_station").innerHTML = "Vélos disponible : " + newStation.available_bikes;
                    document.getElementById("bike_stand_station").innerHTML = "Support vélos : " + newStation.bike_stands;
                    document.getElementById("available_bike_stand_station").innerHTML = "Support vélos disponible : " + newStation.available_bike_stands;
                }
            }


             document.getElementById("pre_reserv").addEventListener("click", displayReservation);

            //Affiche/Cache les div d'infos et de reservations lors du click
             function displayReservation(){
                 let div = document.getElementById("reservation_form");
                div.style.display = "block";
                document.getElementById("info_reserv").style.display= "none";
            }

        });
    }
}