class Demo {
    constructor(variable) {
        // ici je met tout ce qu'il y a besoin à la création de l'objet
        // ici variable = matthieu
        this.mavariablepassee = variable;
        console.log(this.mavariablepassee);

        $('#mybutton').click(function() { //.bind
            mavariable.premierefunction();
        });
    }

    // ici je met mes fonctions
    premierefunction() {
        console.log(this.mavariablepassee);
    }

    deuxiemefunction() {

    }
}

let mavariable = new Demo('matthieu')