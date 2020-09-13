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

        $('#player').click(() => {
            this.pause();
        });
    }

    play() {
        this.interval = setInterval(this.defiled.bind(this), 5000);
    }
// revoir la partie play pause
    pause(){
        if (this.play){
            clearTimeout(this.interval);
            $('.fa-play-circle').show();
            $('.fa-pause').hide();
        } else {
            this.next();
            this.play();
            $('.fa-play-circle').hide();
            $('.fa-pause').show();
        }
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