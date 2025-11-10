const rings = document.querySelector('.progress-container');
const value = +rings.dataset.value;
const circle = rings.querySelector('.progress-svg-value');
const radius = circle.r.baseVal.value;
const circleLength = 2 * Math.PI * radius;
const input = document.getElementById('input-value')

circle.style.strokeDasharray = circleLength;
circle.style.strokeDashoffset = circleLength;
rings.dataset.value = 0;

function updateProgressBar(value){
    circle.style.strokeDashoffset = circleLength * (1 - value / 100);
    rings.dataset.value = value;
}


input.addEventListener('input', function(){
    updateProgressBar(+this.value);
})

