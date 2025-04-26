let body = document.querySelector("body");
let numberOfSquares = 16;
let finalColor = [];
let count = 0;
let brightness = 100;
let countOpacity = 0;
let isDrawing = false;
let userInputButton = document.querySelector(".number-square-change-button");
let eraseButton = document.querySelector('.erase-button');
let colorButton = document.querySelector('.color-button');
let changeMode = document.querySelector('#theme');
let alertContainer = document.querySelector('.alert-container');
let alertImage = document.querySelector('.alert-image');
let alertText = document.querySelector('.alert-to-erase');
let square;
let container;
let squares;
let mouseClicked = 0; 


let RGBValues = () => {
    for (let i = 0; i < 3; i++){
    finalColor.push(Math.floor(Math.random() * 255));
    }
}

let removeChild = () => {
    container.remove();
    createSquares();
}

let switchModes = () => {
    if (changeMode.children[0].classList.contains("light")){
        changeMode.children[0].classList.add("dark");
        changeMode.children[0].src = "./resources/moon.png";
        changeMode.children[0].classList.remove("light");
    } else {
        changeMode.children[0].classList.add("light");
        changeMode.children[0].src = "./resources/sun.png";
        changeMode.children[0].classList.remove("dark");
    }

    changeMode.classList.toggle("dark-prompt");
    darkMode();
}
let darkMode = () => {
    body.classList.toggle("dark-mode");
    eraseButton.classList.toggle("erase-button-dark");
    userInputButton.classList.toggle("number-square-change-button-dark");
    container.classList.toggle("dark-borders");
    alertImage.classList.toggle("dark-alert-image");
    alertText.classList.toggle("dark-alert-to-erase");
    for (let squares of container.children){
        squares.classList.toggle("dark-mode-squares");
    }
}

let darkModeForGrid = () => {
    container.classList.add("dark-borders");
    for (let squares of container.children){
        squares.classList.add("dark-mode-squares");
    }
}

let colorOfSquare = () => {
    for (let i = 0; i < finalColor.length; i++){
        finalColor.shift(finalColor[i]);
    }
    RGBValues();
    let lightOrDark = (finalColor[0]*299 + finalColor[1]*587 + finalColor[2]*114) / 1000;
    colorButton.style.backgroundColor = `rgb(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]})`;
    colorButton.style.color = `white`;
    if (lightOrDark > 128){
        colorButton.style.color = `black`;
    }
    let colorOfButton = getComputedStyle(colorButton).getPropertyValue("background-color");
    console.log(colorOfButton);
    colorButton.style.border = `solid ${colorOfButton} 2px`;
    colorButton.style.borderRadius = '10px';
}


colorButton.addEventListener("click", colorOfSquare);
eraseButton.addEventListener("click", removeChild);
changeMode.addEventListener("click", switchModes);

userInputButton.addEventListener("click", () => {
    let userInput = prompt("How many squares do you want?");

    if (userInput != null && typeof(Number(userInput)) == "number"){
        numberOfSquares = userInput;
        removeChild();
        colorOfSquare();
    }
});



let eventListeners = () => {
    container.addEventListener("mouseleave", (e) => {
        isDrawing = false;
    });

    container.addEventListener("mousedown", (e) => {
        isDrawing = true;
        if (e.button === 0){
            mouseClicked = 0;
            if (e.target.parentElement == container){
                countOpacity++; 
                brightness -= 10;
                e.target.style.filter = `brightness(${brightness}%)`;
                e.target.style.backgroundColor = `rgb(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]})`;
            }
        } else {
            mouseClicked = 2;
        }
        count = 1;
    }); 

    container.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.target.style.filter = "brightness(100%)";
        e.target.style.backgroundColor = "";
    })

    container.addEventListener("mouseup", (e) => {
        isDrawing = false;  
    })

    for (let i = 0; i < squares.length; i++){
        squares[i].addEventListener("mouseover", (e) => {
            if (countOpacity == 10){
                brightness = 100;
                countOpacity = 0;
            }
            if (isDrawing){
                if (mouseClicked == 0){
                    countOpacity++;
                    brightness -= 10;
                    e.target.style.backgroundColor = `rgb(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]})`;
                    e.target.style.filter = `brightness(${brightness}%)`;
                    count++;
                } else {
                    e.target.style.filter = "brightness(100%)";
                    e.target.style.backgroundColor = "";
                }
            }
        })
    }
}

let createSquares = () => {
    brightness = 100;
    countOpacity = 0;
    RGBValues();
    colorOfSquare();
    container = document.createElement("div");
    container.setAttribute("class", "container");
    body.appendChild(container);
    let containerSize = Number(window.getComputedStyle(container).getPropertyValue("width").replace("px", ""));
    for (let i = 1; i <= numberOfSquares*numberOfSquares; i++){
        let divSquares = document.createElement('div');
        divSquares.setAttribute("class", "square");
        divSquares.style.width = `${(containerSize/numberOfSquares)-1}px`;
        divSquares.style.height = `${(containerSize/numberOfSquares)-1}px`;
        container.appendChild(divSquares);
    }

    if (body.classList.contains("dark-mode")){
        darkModeForGrid();
    }

    squares = document.querySelectorAll(".square");
    eventListeners();
}
window.resize = createSquares;
createSquares();
container.style.maxWidth = '350px';
container.style.maxHeight = '350px';

container.style.minWidth = '350px';
container.style.minHeight = '350px';
















