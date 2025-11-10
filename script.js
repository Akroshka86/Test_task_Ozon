class ProgressBar{
    constructor(progress_container, input_value, rotateCheckbox, hidenCheckbox){
        this.rings = document.querySelector(progress_container);
        this.circle = this.rings.querySelector('.progress-svg-value');
        this.input = document.getElementById(input_value);
        this.rotateCheckbox = document.getElementById(rotateCheckbox);
        this.hidenCheckbox = document.getElementById(hidenCheckbox);
        this.svg = this.rings.querySelector('.progress-svg');

        this.radius = this.circle.r.baseVal.value;
        this.circleLength = 2 * Math.PI * this.radius;
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
        let normalizeValue;
        if (value <= 0) {
            normalizeValue = 0
        } else if (value >= 100){
            normalizeValue = 100;
        } else {
            normalizeValue = value;
        }

        this.circle.style.strokeDashoffset = this.circleLength * (1 - normalizeValue / 100);
        this.rings.dataset.value = normalizeValue;
    }

    toggleAnimation(isAnimated){
        this.svg.style.animation = isAnimated ? `rotate 2s linear infinite` : `none`;
    }

    toggleHidden(isHidden){
        this.rings.style.display = isHidden ? `none` : `block`;
    }


    // Блок API
    getValue() {
        return +this.rings.dataset.value;
    }

    // На практике можно обращаться и к предыдущим методам, но добавим функционал, 
    // чтобы также обновлялся input и checkbox
    setValue(value) {
        this.updateProgressBar(value);
        this.input.value = value;
    }

    setAnimated(isAnimated) {
        this.toggleAnimation(isAnimated)
        this.rotateCheckbox.checked = isAnimated;
    }

    setHidden(isHidden) {
        this.toggleHidden(isHidden)
        this.hidenCheckbox.checked = isHidden;
    }
}

const progressBar = new ProgressBar('.progress-container', 'input-value', 'input-checkbox', 'input-checkbox-hidden');