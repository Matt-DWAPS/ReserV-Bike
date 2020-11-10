class Slider {
    constructor() {
        this.images = ['content/FullScreenHeader1.jpg', 'content/FullScreenHeader2.jpg', 'content/FullScreenHeader3.jpg'];
        this.imageCurrent = 0;
        $('#slide-img').attr("src", this.images[this.imageCurrent]);
        this.text = [
            "1. Selectionnez la station<br>de votre choix",
            "2. Renseignez vos informations,<br>signé et reserver !",
            "3. Votre vélo est disponible pour une durée de 20 minutes<br>dans la station selectionnée, bonne balade !"];
        this.textCurrent = 0;
        $('#text_slider').html(this.text[this.textCurrent]);
        this.run = true;
        this.play();


        $('#next').click(() => {
            clearInterval(this.interval);
            this.next();
            if ($('#pause')) {
                $('#play').click();
                clearInterval(this.interval);
            }
            this.play();
        });

        $('#previous').click(() => {
            clearInterval(this.interval);
            this.prev();
            if ($('#pause')) {
                $('#play').click();
                clearInterval(this.interval);
            }
            this.play();
        });

        $('#pause').click(() => {
            clearInterval(this.interval);
            $('#pause').css('display', 'none');
            $('#play').css('display', 'block');
        });

        $('#play').click(() => {
            this.play();
            $('#pause').css('display', 'block');
            $('#play').css('display', 'none');
        });

        document.addEventListener("keydown", this.keyboardAction.bind(this));

    }

    keyboardAction(event) {
        if (event.key === "ArrowLeft") {
            clearInterval(this.interval);
            this.prev();
            this.play();
        }
        if (event.key === "ArrowRight") {
            clearInterval(this.interval);
            this.next();
            this.play();
        }
    }

    play() {
        this.interval = setInterval(this.defiled.bind(this), 5000);
    }

    next() {
        if (this.images.length - 1 === this.imageCurrent
            && this.text.length - 1 === this.textCurrent) {
            this.imageCurrent = 0;
            this.textCurrent = 0;

        } else {
            this.imageCurrent++;
            this.textCurrent++;
        }
        $('#slide-img').attr("src", this.images[this.imageCurrent]);
        $('#text_slider').html(this.text[this.textCurrent]);
    }

    prev() {
        if (this.imageCurrent > 0
            && this.textCurrent > 0) {
            this.imageCurrent--;
            this.textCurrent--;
        } else {
            this.imageCurrent = this.images.length - 1;
            this.textCurrent = this.text.length - 1;
        }
        $('#slide-img').attr("src", this.images[this.imageCurrent]);
        $('#text_slider').html(this.text[this.textCurrent]);
    }

    defiled() {
        if (this.run) {
            this.next();
        }
    }

}