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

            //Boutton pour passer au formulaire initialiser a fermé
            let button_reserv = document.getElementById('pre_reserv');

            for (let station of allStations) {
                let newStation = Object.create(mymap.stationObject);

                newStation.init(station.name, station.address, station.position.lat, station.position.lng, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes, station.last_update);

                let iconBase = mymap.greenIcon;

                if (newStation.status === "OPEN" && newStation.available_bikes >= 1) {
                    newStation.status = " OUVERT";
                    if (newStation.available_bikes < 10) { // moins de 10 places restantes, il devient orange
                        iconBase = mymap.orangeIcon;
                    }
                }
                if (newStation.status === "CLOSE"){
                    newStation.status = " FERMEE";
                    iconBase = mymap.redIcon;
                }
                let marker = L.marker([newStation.position.lat, newStation.position.lng], {icon: iconBase}).addTo(mymap.map)
                marker.bindPopup("<p>" + station.name + "</p>" + "<p>" + station.address + "</p>");


                //Au click hors station vide les champs
                mymap.map.addEventListener("click", deselectStation)

                function deselectStation() {
                    $('#info_reserv h4').html('Veuillez selectionner votre station');
                    $('#info_reserv p').html('');
                    $('#reservation_form').css("display", "none");
                    $('#info_reserv').css("display", "block");
                    $('#container_pre_reserv').css("display", "none");
                }

                //Au click sur une station ajoute les infos la concernant
                marker.addEventListener("click", selectStation);

                function selectStation() {
                    if (newStation.status === " OUVERT" && newStation.available_bikes >= 1){
                        console.log("fermé");
                        button_reserv.disabled = false;
                        $('#disable-reservation-warning').css("display", "none");
                    }
                    if (newStation.status === " FERMEE" || newStation.available_bikes === 0){
                        button_reserv.disabled  = true;
                        $('#disable-reservation-warning').css("display", "block");
                    }
                    $('#info_reserv').css("display", "block");
                    $('#container_pre_reserv').css("display", "block");
                    $('#reservation_form').css("display", "none");
                    $('#title_station').text("station");
                    $('#name_station').text(newStation.name);
                    $('#address_station').text(newStation.address);
                    $('#status_station').text("Actuellement : " + newStation.status);
                    $('#disponibility_bike_station').text("Vélos disponible : " + newStation.available_bikes);
                    $('#bike_stand_station').text("Support vélos : " + newStation.bike_stands);
                    $('#available_bike_stand_station').text("Support vélos disponible : " + newStation.available_bike_stands);
                }
            }


            $('#pre_reserv').click(displayReservation);

            //Affiche/Cache les div d'infos et de reservations lors du click
            function displayReservation() {
                $('#reservation_form').css("display","block");
                $('#info_reserv').css("display","none");
            }

        });
    }
}