class Reservation {
    constructor(canvas) {
        this.reservation_form = $('#reservation_form'); //Formulaire de résa
        this.input_lastname = $('#lastname').val //Champ "nom" de résa
        this.input_firstname = $('#firstname');//Champ "prénom" de résa
        this.input_reservation_form = $('#btn_reservation_form');//Bouton de résa
        this.min_timer = 20;
        this.sec_timer = 0;
        this.canvas = canvas;

        this.initSettings();
        document.getElementById('btn_reservation_form').addEventListener('click', (e) => {

            if ($('#lastname').val !== "" || $('#firstname').val !== ""){

                $("#canvas").css("display", "block");

                localStorage.setItem("Prénom",$('#firstname').val());
                localStorage.setItem("Nom",$('#lastname').val());
                //localStorage.clear();
                localStorage.getItem("Nom");
                localStorage.getItem("Prénom");
            } else {
                alert("Veuillez remplir tout les champs")
            }
            sessionStorage.station = $('#name_station').text(); // enregistre (temporairement) la valeur station

            console.log(`Nom et prénom : ${localStorage.getItem('Nom')} ${localStorage.getItem('Prénom')} réservé à la station ${sessionStorage.getItem('station')}`);

            //this.registration();
        })


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

    preReservation(event){
        event.preventDefault();
        console.log("champ vide");
    }

    reservation_exist(){
        let lastname =localStorage.getItem("Nom");
        console.log(name);
        let firstname =localStorage.getItem("Prénom");
        document.getElementById("lastnameSession").innerHTML = lastname;
        document.getElementById("firstnameSession").innerHTML = firstname;

    }
}