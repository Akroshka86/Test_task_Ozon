class ProgressBar{
    constructor(progress_container, input_value, checkboxSelector){
        this.rings = document.querySelector(progress_container);
        this.circle = this.rings.querySelector('.progress-svg-value');
        this.radius = this.circle.r.baseVal.value;
        this.circleLength = 2 * Math.PI * this.radius;
        this.input = document.getElementById(input_value);
        this.checkbox = document.getElementById(checkboxSelector);
        this.svg = this.rings.querySelector('.progress-svg');

        this.circle.style.strokeDasharray = this.circleLength;
        this.circle.style.strokeDashoffset = this.circleLength;
        this.rings.dataset.value = 0;

        this.input.addEventListener('input', () => {
            this.updateProgressBar(+this.input.value);
        });

        this.checkbox.addEventListener('change', () => {
            this.toggleAnimation(+this.checkbox.checked);
        });
    }

    updateProgressBar(value){
        this.circle.style.strokeDashoffset = this.circleLength * (1 - value / 100);
        this.rings.dataset.value = value;
    }

    toggleAnimation(isAnimated){
        this.svg.style.animation = isAnimated ? `rotate 2s linear infinite` : `none`;
    }
}

const progressBar = new ProgressBar('.progress-container', 'input-value', 'input-checkbox');
