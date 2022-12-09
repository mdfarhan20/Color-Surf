const colorsContainer = document.querySelector('.colors-container');

const generateRandomNumber = (limit) => Math.floor(Math.random() * limit);

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") 
        addColorsToElements();
})

generateColorElements();

const lockBtns = document.querySelectorAll('.lock-icon');
lockBtns.forEach(lock => {
    lock.addEventListener("click", () => {
        if (lock.classList.contains("locked"))
            lock.src = "./img/unlock-icon.png";
        else
            lock.src = "./img/lock-icon.png";

        lock.classList.toggle("locked");
    });
})

const copyBtns = document.querySelectorAll(".copy-icon");
copyBtns.forEach(copy => {
    copy.addEventListener("click", () => {
        const colorCode = copy.parentNode.firstChild.firstChild;
        copyToClipboard(colorCode.textContent);
    })
});

function addColorsToElements() {
    const colorElements = document.querySelectorAll('.color');
    colorElements.forEach(async colorEl => {
        const lockBtn = colorEl.childNodes[2];;
        if (lockBtn.classList.contains("locked"))
            return;

        const color = generateRandomColor();
        const colorNameEl = colorEl.firstChild.lastChild;
        const colorCodeEl = colorEl.firstChild.firstChild;
        const colorData = await getColorData(color);
        colorEl.style.backgroundColor = color;
        colorCodeEl.textContent = colorData.hexValue;
        colorNameEl.textContent = colorData.name;
    });
}

async function getColorData(color) {
    const url = `https://www.thecolorapi.com/id?rgb=${color}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    
    const colorData = {
        hexValue: jsonData.hex.value,
        name: jsonData.name.value,
    }

    return colorData;
} 

function generateColorElements() {
    colorsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        const colorDescription = document.createElement('div');
        const hexColorEl = document.createElement('h3');
        const colorName = document.createElement('p');
        const lockBtn = document.createElement('img');
        const copyBtn = document.createElement('img');
[]
        lockBtn.setAttribute("src", "./img/unlock-icon.png");
        copyBtn.setAttribute("src", "./img/copy-icon.png");

        div.classList.add("color");
        colorDescription.classList.add("color-description");
        hexColorEl.classList.add("color-code");
        colorName.classList.add("color-name");
        lockBtn.classList.add("color-icon", "lock-icon");
        copyBtn.classList.add("color-icon", "copy-icon");

        colorDescription.append(hexColorEl, colorName);
        div.append(colorDescription, copyBtn, lockBtn);
        colorsContainer.appendChild(div);
    }
    addColorsToElements();
}

function generateRandomColor() {
    const limit = 256;
    const red = generateRandomNumber(limit);
    const green = generateRandomNumber(limit);
    const blue = generateRandomNumber(limit);

    return `rgb(${red}, ${green}, ${blue})`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied!!");
    });
}
