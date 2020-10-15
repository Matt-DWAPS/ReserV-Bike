class Reservation {
    constructor() {
        this.min = 20;
        this.sec = 60;

        this.reservation_form = $('#reservation_form'); //Formulaire de résa
        this.input_lastname = $('#lastname').val(); //Champ "nom" de résa
        this.input_firstname = $('#firstname').val();//Champ "prénom" de résa

        this.station_reservation = $('#name_station').text();
        this.input_reservation_form = $('#btn_reservation_form');//Bouton de résa
        this.sessionFirstname = localStorage.getItem("Prénom");
        this.sessionLastname = localStorage.getItem("Nom");
        //this.canvas = sign.initialisation();


        setTimeout("compteArebours()",60000);
            function compteArebours()
            {
                reservation.min=reservation.min-1;
                $("#time").html(reservation.min);

                if(this.min>0)
                {setTimeout("compteArebours()",60000);}

                else if(this.min===0)
                alert("fini");

            }


        this.initSettings();

        // Au clic sur le boutton je reserve
        this.input_reservation_form.click(function(){
            reservation.reservationCheck();
        });

    } // Fin du constructeur

    initSettings() { // Démarrage de la reservation
        $(document).ready(($) => { // Lorsque le DOM est prêt
            if (!this.storageAvailable('localStorage')) {

                console.log("Impossible d'utiliser local storage!");
            }
            if (!localStorage.Nom) { // s'il n'y a pas d'élément name, on laisse l'utilisateur faire
                console.log("Veuillez renseigner vos identifiants"); // populateStorage();
            } else { // si l'élément est présent (sauvegardé), on active les changements sauvegardés
                this.reservation_exist();
            }
        });
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

    reservationCheck(){
        if ($('#lastname').val() !== "" || $('#firstname').val() !== ""){
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem("Prénom",$('#firstname').val());
            localStorage.setItem("Nom",$('#lastname').val());

            sessionStorage.setItem("station",$('#name_station').text()); // enregistre (temporairement) la valeur station
            this.start();
            $("#lastnameSession").html(reservation.sessionLastname);
            $("#firstnameSession").html(reservation.sessionFirstname);
        } else {
            $("#form-error-renseignement").css("display", "block");
        }
        //this.registration();
    }

    reservation_exist(){
        if (localStorage.length !== 0){
            $("#lastnameSession").html(reservation.sessionLastname);
            $("#firstnameSession").html(reservation.sessionFirstname);
        }
        let lastname =localStorage.getItem("Nom");
        console.log(name);
        let firstname =localStorage.getItem("Prénom");
        $("#lastnameSession").innerHTML = lastname;
        $("#firstnameSession").innerHTML = firstname;

    }

    start_timer() {
        //let timer=setInterval(reservation.min, 250);
        if(reservation.sec > 0) {
            reservation.sec--;
            document.getElementById("second").innerHTML = reservation.sec + " secondes restantes";
            if (reservation.sec === 0){
                reservation.min--;
                document.getElementById("time").innerHTML = reservation.min + " minutes";
            }
        }
        else if (reservation.min === 0){
            this.stop_timer();
            document.getElementById("time").innerHTML ="reservation terminé";
        }
    }

    start(){
        setTimeout(this.start_timer,500);
    }

    stop_timer()
    {
        clearInterval(reservation.min);
    }

}
let reservation = new Reservation();