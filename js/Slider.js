class Slider {
    constructor() {
        this.images = ['content/FullScreenHeader1.jpg', 'content/FullScreenHeader2.jpg', 'content/FullScreenHeader3.jpg'];
        this.imageCurrent = 0;
        $('#slide-img').attr("src", this.images[this.imageCurrent]);
        this.run = true;
        this.play();


        $('#next').click(() => {
            clearInterval(this.interval);
            this.next();
            this.play();
        });

        $('#previous').click(() => {
            clearInterval(this.interval);
            this.prev();
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
        if (this.images.length - 1 === this.imageCurrent) {
            this.imageCurrent = 0;

        } else {
            this.imageCurrent++;
        }
        $('#slide-img').attr("src", this.images[this.imageCurrent]);
    }

    prev() {
        if (this.imageCurrent > 0 ) {
            this.imageCurrent --;
        } else {
            this.imageCurrent = this.images.length -1;
        }
        $('#slide-img').attr("src", this.images[this.imageCurrent]);
    }

    defiled() {
        if (this.run) {
            this.next();
        }
    }

}