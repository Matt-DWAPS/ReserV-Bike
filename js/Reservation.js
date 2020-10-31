class Reservation {
    constructor() {
        this.input_lastname = $('#lastname'); //Champ "nom" de résa
        this.input_firstname = $('#firstname');//Champ "prénom" de résa

        this.station_reservation = $('#name_station');

        this.session_firstname = localStorage.getItem("prenom");
        this.session_lastname = localStorage.getItem("nom");
        this.session_timer = localStorage.getItem("endTimerReservation");

        this.initSettings();

        // Au clic sur le boutton je reserve
        document.getElementById('btn_reservation_form').addEventListener('click', function () {
            reservation.reservationCheck();
        });
    } // Fin du constructeur

    initSettings() {
            if (!this.storageAvailable('localStorage')) {
                console.log("Impossible d'utiliser local storage!");
            }
            if (!localStorage.nom) { // s'il n'y a pas d'élément name, on laisse l'utilisateur faire
                console.log("Veuillez renseigner vos identifiants");
            } else { // si l'élément est présent (sauvegardé), on active les changements sauvegardés
                this.reservation_exist();
            }
    };

    storageAvailable(type) {
        try {
            let storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    };

    reservationCheck() {
        if (reservation.input_lastname.val() !== "" || reservation.input_firstname.val() !== "") {
            if (signe.valid === true){
                // Nettoyage des valeurs du local et session storage pour un nouvel enregistrement
                localStorage.clear();
                sessionStorage.clear();

                // Enregistrement des nouvelles valeurs
                localStorage.setItem("prenom", reservation.input_firstname.val());
                localStorage.setItem("nom", reservation.input_lastname.val());
                sessionStorage.setItem("station", reservation.station_reservation.text()); // enregistre (temporairement) la valeur station

                // //Démarrage du timer
                reservation.start_timer();
            } else{
                $('#confirmation').css("display", "block");
                $('#confirmation').html("Signature invalide, veuillez recommencer");
                $('#confirmation').css("color", "red");
            }
        } else {
            $("#form-error-renseignement").css("display", "block");
        }
    }

    reservation_exist() {

        if (localStorage.length !== 0) {
            $("#lastnameSession").html(this.session_lastname);
            $("#firstnameSession").html(this.session_firstname);
            $("#lastname").val(this.session_lastname);
            $("#firstname").val(this.session_firstname);
            $("#minutely").html(this.session_timer);
            localStorage.getItem("endTimerReservation");
            this.continue_timer();
        }
    }

    convert_milliseconds(time){
        let date = new Date(time);
        let min = date.getMinutes();
        let sec = date.getSeconds();

        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;

        return min + ":" + sec;
    }

    continue_timer(){
        // si le localstorage contient un temps (précedemment sauvegardé),
        if (localStorage.getItem("finishTime") !== null) {
            let add_time_at_reservation = new Date().getTime() + localStorage.getItem("finishTime");
            // add_time_at_reservation sera à l'heure actuelle + le reste de temps du timer (donc du paramètre)
        }

        //Démarrage de la boucle /sec
        this.decrement_time();

    }
    start_timer(){
        // add_time_reservation sera à l'heure actuelle + 20 mins
        let add_time_at_reservation = new Date().getTime() + 1200000;

        //Stockage dans le localstorage du temps
        localStorage.setItem("finishTime", add_time_at_reservation.toString());

        //Démarrage de la boucle /sec
        reservation.decrement_time();
    }

    decrement_time(){
        $('#session').css("display", "block");
        $("#btn_reservation_form").css("display", "none");
        $("#btn_canceled_reservation").css("display", "block");
        let x = setInterval(function () {
            //Récuperation de l'heure actuelle
            let now = new Date().getTime();

            //Calcl du temps restant en soustrayant l'heure de reservation +20min à l'heure actuelle
            let time_stop = localStorage.getItem("finishTime") - now;

            //Enregistrement dans le localstorage
            localStorage.setItem("endTimerReservation", time_stop.toString());

            // Convertion du calcul en min et sec
            let returnTime = reservation.convert_milliseconds(time_stop);

            //Affichage dans la page du décompte
            $('#minutely').html( "Il vous reste " + returnTime + " avant la fin de la reservation");
            $('#lastnameSession').css("display", "block");
            $('#firstnameSession').css("display", "block");
            $('#lastnameSession').html("Réservation efféctué par " + localStorage.getItem("nom"));
            $('#firstnameSession').html(localStorage.getItem("prenom") + " à la station " + sessionStorage.getItem("station"));

            //Si le compte a rebours arrive a 00:00 alors stop la reservation
            if (returnTime === "00:00"){
                clearInterval(x);
                $("#btn_reservation_form").css("display", "block");
                $("#btn_canceled_reservation").css("display", "none");
                $('#lastnameSession').css("display", "none");
                $('#firstnameSession').css("display", "none");
                $('#minutely').html('votre réservation à expirée');
                localStorage.clear();
                sessionStorage.clear();
            }
        }, 1000)

        // Au clic sur le boutton "Annulé ma reservation
        document.getElementById("btn_canceled_reservation").addEventListener('click', function (){
            clearInterval(x);
            localStorage.clear();
            sessionStorage.clear();
            $("#btn_reservation_form").css("display", "block");
            $("#btn_canceled_reservation").css("display", "none");
            $('#lastnameSession').css("display", "none");
            $('#firstnameSession').css("display", "none");
            $('#minutely').html('votre réservation à était annulée');

        });

    }


    cancel_reservation(){
        localStorage.clear();
        sessionStorage.clear();
        // time = this.decrement_time();
        // console.log(time);
        //clearInterval(time);

    }
}
