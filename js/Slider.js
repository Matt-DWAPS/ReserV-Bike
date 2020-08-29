class Slider {
	
let slide = new Array("content/FullScreenHeader1.jpg", "content/FullScreenHeader2.jpg", "content/FullScreenHeader3.jpg");
let number = 0;

function ChangeSlide(sens) {
    number = number + sens;
    if (number < 0)
        number = slide.length - 1;
    if (number > slide.length - 1)
        number = 0;
    document.getElementById("slide").src = slide[number];
}
}