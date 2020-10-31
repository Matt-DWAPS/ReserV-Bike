// 4 méthodes : initialisation, gestionEvenements, ajoutClic, Redessine

class Signature {
    constructor() {
        // on récupère l'élément HTML Canvas
        this.canvas = document.querySelector("canvas");

        // Appel au context 2D
        this.context = this.canvas.getContext("2d");

        // Couleur de la signature
        this.context.strokeStyle = "black";

        // Epaisseur de la signature
        this.context.lineWidth= 2;

        // Initialisation de la signature a false au chargement de la page
        // Puisque à ce moment ont ne signe pas
        this.sign = false;

        // Initialisation du clic horizontal a 0
        this.axe_X = 0;
        // Initialisation du clic vertical a 0
        this.axe_Y = 0;

        this.valid = false;

        // Evenement lors du clic
        this.canvas.addEventListener("mousedown", (e) =>{
            // je signe
            signe.sign = true;

            // Je stocke mes coordonnées de départ
            // getBoundingClientRect taille et la position de l'élément canvas
            // On retire le nombre de pixel horizontal et vertical aux coordonnées des clics
            this.axe_X = e.clientX - this.canvas.getBoundingClientRect().left;
            this.axe_Y = e.clientY - this.canvas.getBoundingClientRect().top;

        })

        this.canvas.addEventListener("mousemove", (e) =>{
            // Si je signe
            if (signe.sign){
                let current_X = e.clientX - this.canvas.getBoundingClientRect().left;
                let current_Y = e.clientY - this.canvas.getBoundingClientRect().top;

                //Dessine un point a partir des deux points mémorisé precedement vers les deux points qui vienne d'être clické
                signe.draw(this.axe_X, this.axe_Y, current_X, current_Y);
                this.axe_X = current_X;
                this.axe_Y = current_Y;
                signe.valid = true;
            }
        })

        // Vérifie si une signature est présente dans le canvas
        document.getElementById('btn_confirm_signature').addEventListener("click", function (){
            if (signe.valid === true){
                if (reservation.input_firstname.val() !== "" && reservation.input_lastname.val() !== ""){
                    $('#confirmation').html("Signature valide, vous pouvez confirmer votre réservation");
                    $('#confirmation').css("color", "green");
                } else {
                    $('#confirmation').html("Signature valide, veuillez remplir vos nom et prénom pour confirmer votre réservation");
                    $('#confirmation').css("color", "red");
                }

            } else{
                $('#confirmation').html("Signature invalide, veuillez recommencer");
                $('#confirmation').css("color", "red");
            }
            $('#confirmation').css("display", "block");

        })

        // Lors du relachement du clic ont considère qu'il ne signe plus
        this.canvas.addEventListener("mouseup", () =>{
            // je ne signe plus
            signe.sign = false;
        })

        // Si lors de la signature le curseur sort du cadre ont considère qu'il ne signe plus
        this.canvas.addEventListener("mouseout", () =>{
            // je ne signe plus
            signe.sign = false;
        })

        document.getElementById('btn_erased_signature').addEventListener("click", function (){
            signe.errase();
        })
    };// Fin du constructeur

    //Récuperation des coordonnées de ou a ou on dessine
    draw(depX, depY, destX, destY){
        //Dessine un nouveau trait
        this.context.beginPath();
        // PLace le crayon
        this.context.moveTo(depX, depY);
        //Dessine le trait, du départ vers la destination
        this.context.lineTo(destX, destY);
        // Pour arreter le dessin
        this.context.closePath();
        // Faire le trait
        this.context.stroke();
    };

    errase(){
        // 0,0 correspond aux coordonnées du coin supérieur gauche du canvas
        //width, height correspondent aux tailles definies du canvas
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        signe.valid = false;
        $('#confirmation').css("display", "none");
    }
}