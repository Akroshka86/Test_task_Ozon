class ProgressBar{
    constructor(progress_container, input_value, rotateCheckbox, hidenCheckbox){
        this.rings = document.querySelector(progress_container);
        this.circle = this.rings.querySelector('.progress-svg-value');
        this.radius = this.circle.r.baseVal.value;
        this.circleLength = 2 * Math.PI * this.radius;
        this.input = document.getElementById(input_value);
        this.rotateCheckbox = document.getElementById(rotateCheckbox);
        this.hidenCheckbox = document.getElementById(hidenCheckbox);
        this.svg = this.rings.querySelector('.progress-svg');

        this.circle.style.strokeDasharray = this.circleLength;
        this.circle.style.strokeDashoffset = this.circleLength;
        this.rings.dataset.value = 0;

        this.input.addEventListener('input', () => {
            this.updateProgressBar(+this.input.value);
        });

        this.rotateCheckbox.addEventListener('change', () => {
            this.toggleAnimation(+this.rotateCheckbox.checked);
        });

        this.hidenCheckbox.addEventListener('change', () => {
            this.toggleHidden(+this.hidenCheckbox.checked);
        });
    }

    updateProgressBar(value){
        this.circle.style.strokeDashoffset = this.circleLength * (1 - value / 100);
        this.rings.dataset.value = value;
    }

    toggleAnimation(isAnimated){
        this.svg.style.animation = isAnimated ? `rotate 2s linear infinite` : `none`;
    }

    toggleHidden(isHidden){
        this.rings.style.display = isHidden ? `none` : `block`;
    }
}

const progressBar = new ProgressBar('.progress-container', 'input-value', 'input-checkbox', 'input-checkbox-hidden');
