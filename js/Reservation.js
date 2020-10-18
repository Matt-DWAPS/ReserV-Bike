class Reservation {
    constructor() {
        this.input_lastname = $('#lastname'); //Champ "nom" de résa
        this.input_firstname = $('#firstname');//Champ "prénom" de résa

        this.station_reservation = $('#name_station');
        this.input_reservation_form = $('#btn_reservation_form');//Bouton de résa

        this.session_firstname = localStorage.getItem("prenom");
        this.session_lastname = localStorage.getItem("nom");
        this.session_timer = localStorage.getItem("endTimerReservation");

        this.add_time_at_reservation = "";
        this.now = "";
        this.timeStop = "";

        localStorage.clear();
        //console.log(localStorage.getItem("finishTime"));
        //this.canvas = sign.initialisation();

        this.initSettings();

        // Au clic sur le boutton je reserve
        document.getElementById('btn_reservation_form').addEventListener('click', function () {
            reservation.reservationCheck();
        });
    } // Fin du constructeur

    initSettings() { // Démarrage de la reservation
            if (!this.storageAvailable('localStorage')) {

                console.log("Impossible d'utiliser local storage!");
            }
            if (!localStorage.nom) { // s'il n'y a pas d'élément name, on laisse l'utilisateur faire
                console.log("Veuillez renseigner vos identifiants"); // populateStorage();
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
            // Nettoyage des valeurs du local et session storage pour un nouvel enregistrement
            // localStorage.clear();
            // sessionStorage.clear();
            // Enregistrement des nouvelles valeurs
            localStorage.setItem("prenom", reservation.input_firstname.val());
            localStorage.setItem("nom", reservation.input_lastname.val());
            sessionStorage.setItem("station", reservation.station_reservation.text()); // enregistre (temporairement) la valeur station

            // calcul de l'heure au moment de la réservation + 20min en milliseconde
            // pour connaitre la fin de la reservation


            // //Démarrage du timer
            reservation.start_timer();
            $("#lastnameSession").html(reservation.session_lastname);
            $("#firstnameSession").html(reservation.session_firstname);
        } else {
            $("#form-error-renseignement").css("display", "block");
        }
    }

    reservation_exist() {

        if (localStorage.length !== 0) {
            //localStorage.clear();
            $("#lastnameSession").html(this.session_lastname);
            $("#firstnameSession").html(this.session_firstname);
            $("#lastname").val(this.session_lastname);
            $("#firstname").val(this.session_firstname);
            $("#minutely").html(this.session_timer);
            localStorage.getItem("endTimerReservation");

            this.start_timer();
            //console.log(localStorage.getItem("finishTime"));
            //reservation.convert_milliseconds(localStorage.getItem("finishTime"));
            //reservation.convert_milliseconds(localStorage.getItem("endTimerReservation"));
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

    convert_seconds(time){
        let date = new Date(time);
        let milli = date.getMilliseconds();

        milli = (milli < 10) ? "0" + milli : milli;
    }

    start_timer(){
        console.log(localStorage);
        let add_time_at_reservation ="";
        let end="";
        // si le localstorage contient un temps (précedemment sauvegardé),
        if (localStorage.getItem("finishTime") !== null) {
            add_time_at_reservation = new Date().getTime() + localStorage.getItem("finishTime");

            console.log('date déja enregistré');
                // after sera à l'heure actuelle + le reste de temps du timer (donc du paramètre "date")
        } else {
            add_time_at_reservation = new Date().getTime() + 1200000; // Sinon after sera à l'heure actuelle + 20 mins
            //conversion de l'heure de reservation et des 20 min ajouté en min et sec
            //Stockage dans le localstorage du temps
            localStorage.setItem("finishTime", add_time_at_reservation.toString());
            console.log('aucune date enregistré');
        }


        let convertt =reservation.convert_milliseconds(add_time_at_reservation);

        //Démarrage de la boucle /sec
        let x = setInterval(function () {
            //Récuperation de l'heure actuelle
            let now = new Date().getTime();
            let convert= reservation.convert_milliseconds(now);

            console.log(localStorage);
            //Calcl du temps restant en soustrayant l'heure de reservation +20min à l'heure actuelle
            let timeStop = localStorage.getItem("finishTime") - now;

            //Enregistrement dans le localstorage
            localStorage.setItem("endTimerReservation", timeStop.toString());
// Convertion du calcul en min et sec
            let returnTime = reservation.convert_milliseconds(timeStop);
            //Affichage dans la page du décompte
            $('#minutely').html(returnTime + "stop");

            //Si le compte a rebours arrive a 00:00 alors stop la reservation
            if (returnTime === "00:00"){
                clearInterval(x);
                $('#minutely').html('votre réservation à expiré');
            }
        }, 1000)

    }

    // start_timer(){
    //     console.log(localStorage.getItem("finishTime"));
    //
    //
    //
    //     let end = reservation.convert_milliseconds(end_reservation_time);
    //     localStorage.setItem("finishTime", end_reservation_time);
    //     let x = setInterval(function () {
    //         let start_reservation_time = new Date().getTime();
    //         console.log(localStorage);
    //         let timeStop = end_reservation_time - start_reservation_time;
    //         let returnTime = reservation.convert_milliseconds(timeStop);
    //         localStorage.setItem("endTimerReservation", returnTime);
    //
    //         $('#minutely').html(localStorage.getItem("endTimerReservation") + "stop");
    //         if (returnTime === "00:00"){
    //             clearInterval(x);
    //             $('#minutely').html('votre réservation à expiré');
    //         }
    //     }, 1000)
    //
    // }

    restarting_the_timer() {
        let end_reservation_time = localStorage.getItem("finishTime");
        localStorage.setItem("finishTime", end_reservation_time);
        let x = setInterval(function () {
            let start_reservation_time = new Date().getTime();
            let timeStop = end_reservation_time - start_reservation_time;
            let returnTime = reservation.convert_milliseconds(timeStop);
            localStorage.setItem("endTimerReservation", returnTime);

            $('#minutely').html(localStorage.getItem("endTimerReservation") + " ici");
            if (returnTime === "00:00"){
                clearInterval(x);
                $('#minutely').html('votre réservation à expiré');
            }
        }, 1000)
    }

    cancel_reservation(){
        let t =reservation.restarting_the_timer(x);
        console.log(t);
    }
}
