const progressBar = new ProgressBar(".progress-container");

const valueInput = document.getElementById("input-value");
const animateCheckbox = document.getElementById("input-checkbox");
const hideCheckbox = document.getElementById("input-checkbox-hidden");

valueInput.type = "text";

progressBar.setValue(valueInput.value);
progressBar.setAnimated(animateCheckbox.checked);
progressBar.setHidden(hideCheckbox.checked);

function normalizeValue(rawValue) {
  let cleanString = rawValue.replace(/\D/g, "");

  if (cleanString === "") {
    return {
      numericValue: 0,
      cleanString: "",
    };
  }

  let numericValue = parseInt(cleanString, 10);
  numericValue = Math.max(0, Math.min(100, numericValue));

  cleanString = numericValue.toString();

  return { numericValue, cleanString };
}

valueInput.addEventListener("input", (event) => {
  const inputElement = event.target;
  const { numericValue, cleanString } = normalizeValue(inputElement.value);

  if (inputElement.value !== cleanString) {
    inputElement.value = cleanString;
  }

  progressBar.setValue(numericValue);
});

animateCheckbox.addEventListener("change", (event) => {
  progressBar.setAnimated(event.target.checked);
});

hideCheckbox.addEventListener("change", (event) => {
  progressBar.setHidden(event.target.checked);
});
