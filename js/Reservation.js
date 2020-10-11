class Reservation {
    constructor(reservation_form, timer, canvas) {
        this.reservation_form = $('#reservation_form'); //Formulaire de résa
        this.reservation_lastname = $('#lastname'); //Champ "nom" de résa
        this.reservation_firstname = $('#firstname');//Champ "prénom" de résa
        this.input_reservation_form = $('#btn_reservation_form');//Bouton de résa

        this.Min_timer = 20;
        this.sec_timer = 0;
        this.canvas = canvas;
        this.initSettings();

        $(this.input_reservation_form).click(this.addInLocalStorage());

    } // Fin du constructeur

    initSettings() { // Démarrage de la reservation
        $(document).ready(($) => { // Lorsque le DOM est prêt
            if (!this.storageAvailable('localStorage')) {
                console.log("Impossible d'utiliser local storage!");
            }
            if (!localStorage.name) { // s'il n'y a pas d'élément name, on laisse l'utilisateur faire
                console.log("Veuillez renseigner vos identifiants"); // populateStorage();
            } else { // si l'élément est présent (sauvegardé), on active les changements sauvegardés
                this.registration();
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

    addInLocalStorage() { // enregistrer des valeurs
        localStorage.lastname = this.reservation_lastname.val(); // enregistre la valeur nom
        localStorage.firstname = this.reservation_firstname.val(); // enregistre la valeur prénom
        sessionStorage.station = $('#name_station').text(); // enregistre (temporairement) la valeur station

        console.log(`Prénom et nom : ${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} réservé à la station ${sessionStorage.getItem('station')}`);

        this.registration();
    };

    registration(){
       let isFirstname = localStorage.name;
       let islastname = localStorage.lastname;
       let stationName = sessionStorage.station;

       this.reservation_firstname.val(isFirstname);
       this.reservation_lastname.val(islastname);

    }
}