const inputs = document.querySelectorAll("input");
const mainBox = document.querySelector(".main-box");
const printedText = document.querySelector(".printed-text");
const unitSelector = document.getElementById("unit-selector");
const unitText = document.getElementsByClassName("units");
const danceButton = document.querySelector(".dance-button");
const copyButton = document.querySelector(".copy-text");
let timer;

const inputValues = {
    x1: 50,
    x2: 50,
    x3: 50,
    x4: 50,
    y1: 50,
    y2: 50,
    y3: 50,
    y4: 50,
    units: '%',
    constructString({
        x1,
        x2,
        x3,
        x4,
        y1,
        y2,
        y3,
        y4,
        units
    } = this) {
        return `${x1}${units} ${x2}${units} ${x3}${units} ${x4}${units} / ${y1}${units} ${y2}${units} ${y3}${units} ${y4}${units}`
    },
    isDancing: false,
    dance() {
        this.x1 = Math.floor(Math.random() * 101);
        this.x2 = Math.floor(Math.random() * 101);
        this.x3 = Math.floor(Math.random() * 101);
        this.x4 = Math.floor(Math.random() * 101);
        this.y1 = Math.floor(Math.random() * 101);
        this.y2 = Math.floor(Math.random() * 101);
        this.y3 = Math.floor(Math.random() * 101);
        this.y4 = Math.floor(Math.random() * 101);
        this.setTexts();
        inputs.forEach((input) => {
            input.value = inputValues[input.name];
        });
    },
    setTexts() {
        mainBox.style.borderRadius = this.constructString();
        printedText.textContent = `boder-radius: ${mainBox.style.borderRadius}`;
    }
}


inputValues.setTexts();

inputs.forEach((input) => {
    input.addEventListener("input", event => {
        const {
            name,
            value
        } = event.target;
        inputValues[name] = value;
        inputValues.setTexts()
    });
    input.value = inputValues[input.name];
});

unitSelector.addEventListener("change", (event) => {
    inputValues.units = event.target.value;
    for (let i = 0; i < unitText.length; i++) {
        unitText[i].textContent = inputValues.units;
    };
    inputValues.setTexts();
});


danceButton.addEventListener("click", () => {
    if (!inputValues.isDancing) {
        timer = setInterval(() => {
            inputValues.dance()
        }, 1000);
        inputValues.isDancing = true;
    } else {
        clearInterval(timer);
        inputValues.isDancing = false;
    }
});

copyButton.addEventListener("click", () => {
    copyToClipboard(printedText.textContent);
})

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("text copied to clipboard")
};