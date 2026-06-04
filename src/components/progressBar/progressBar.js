class ProgressBar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error(`Container ${containerSelector} not found`);
    }

    this.svg = this.container.querySelector(".progress-svg");
    this.circle = this.container.querySelector(".progress-svg-value");

    this.radius = this.circle.r.baseVal.value;
    this.circleLength = 2 * Math.PI * this.radius;
    this.circle.style.strokeDasharray = this.circleLength;
    this.circle.style.strokeDashoffset = this.circleLength;

    this.value = 0;
  }

  setValue(value) {
    const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
    this.value = safeValue;

    const offset = this.circleLength * (1 - this.value / 100);
    this.circle.style.strokeDashoffset = offset;
  }

  setAnimated(isAnimated) {
    this.svg.style.animation = isAnimated
      ? `rotate 2s linear infinite`
      : `none`;
  }

  setHidden(isHidden) {
    this.container.style.visibility = isHidden ? `hidden` : `visible`;
  }
}
