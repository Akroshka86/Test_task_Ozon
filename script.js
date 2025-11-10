const rings = document.querySelector('.progress-container');
const value = +rings.dataset.value;
const circle = rings.querySelector('.progress-svg-value');
const radius = circle.r.baseVal.value;
const circleLength = 2 * Math.PI * radius;

circle.style.strokeDasharray = circleLength;
circle.style.strokeDashoffset = circleLength * (1 - value / 100);
