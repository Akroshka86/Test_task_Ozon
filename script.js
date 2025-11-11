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

        this.input.addEventListener('beforeinput', (line) => {
            this.validateInput(line);
        });

        this.rotateCheckbox.addEventListener('change', () => {
            this.toggleAnimation(+this.rotateCheckbox.checked);
        });

        this.hidenCheckbox.addEventListener('change', () => {
            this.toggleHidden(+this.hidenCheckbox.checked);
        });
    }

    // Основные методы
    updateProgressBar(value){        
        this.circle.style.strokeDashoffset = this.circleLength * (1 - value / 100);
        this.rings.dataset.value = value;
    }

    toggleAnimation(isAnimated){
        this.svg.style.animation = isAnimated ? `rotate 2s linear infinite` : `none`;
    }

    toggleHidden(isHidden){
        this.rings.style.visibility = isHidden ? `hidden` : `visible`;
    }

    // Блок валидации
    validateInput(line) {
        const currentValue = this.input.value;
        const selectionStart = this.input.selectionStart ?? currentValue.length;
        const selectionEnd = this.input.selectionEnd ?? currentValue.length;

        const newValue =
            currentValue.slice(0, selectionStart) +
            line.data +
            currentValue.slice(selectionEnd);
        
        if (line.inputType.startsWith('delete')) return;

        if(!/^\d$/.test(line.data)){
            line.preventDefault();
            return;
        }

        if (/^0\d/.test(newValue)) {
            line.preventDefault();
            return;
        }

        if (newValue.length > 3) {
            line.preventDefault();
            return;
        }

        const num = Number(newValue);
        if (num < 0 || num > 100){
            line.preventDefault();
            return;
        }
    }

    // Блок API
    getValue() {
        return +this.rings.dataset.value;
    }

    // На практике можно обращаться и к предыдущим методам, но добавим функционал, 
    // чтобы также обновлялся input и checkbox
    setValue(value) {
        if (value < 0 || value > 100){
            throw new Error(`The value must be between 0 and 100. Received: ${value}`)
        }

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