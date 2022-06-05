function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function onHover(square){
    if (eraserMode){
        square.style.backgroundColor = 'transparent';
    } else if (randomColor){
        let randomColor = random_rgba();
        square.style.backgroundColor = randomColor;
    } else {
        square.style.backgroundColor = currentColor;
    }
}

function offHover(square){
    square.style.backgroundColor = "transparent";
}

function createGrid(width=16){
    for (let x=0; x<width; x++){
    let cont = document.createElement('div');
    cont.className = 'column';
    cont.setAttribute('id', `line${x+1}`);
    containerDiv.appendChild(cont);
    for(let y=0; y<width; y++){
        let div = document.createElement('div');
        div.className = 'square';
        //div.textContent += 'h';
        cont.appendChild(div);
    }
    }
}

function squaresInteractive(){
    const squares = document.querySelectorAll('.square');
    squares.forEach (square => square.addEventListener('click', function(){
        onHover(square);
    }))
    squares.forEach (square => square.addEventListener('mouseenter', function(){
        if (mouseDown === 1){
            onHover(square);
        }
    }))
    /*
    squares.forEach (square => square.addEventListener('mouseleave', function(){
        offHover(square);
    }))*/
}

function toggleRBtn(){
    if (randomColor){
        randomBtn.style.backgroundColor = '#66FCF1';
        randomBtn.style.color = '#1F2833';
    } else {
        randomBtn.style.backgroundColor = '#1F2833';
        randomBtn.style.color = '#C5C6C7';
    }
}

function toggleEBtn(){
    if (eraserMode){
        eraserBtn.style.backgroundColor = '#66FCF1';
        eraserBtn.style.color = '#1F2833';
    } else {
        eraserBtn.style.backgroundColor = '#1F2833';
        eraserBtn.style.color = '#C5C6C7';
    }
}

//Create grid container div element and set its initial width
containerDiv = document.querySelector('#container');
let gridWidth = 16;

//Implement slider for changing grid size
const pixelsPara = document.querySelector('#gridSize');
pixelsPara.textContent = `Grid size: ${gridWidth}px`;
const slider = document.querySelector('#slider');
slider.addEventListener('change', function(){
    gridWidth = this.value;
    pixelsPara.textContent = `Grid size: ${gridWidth}px`;
    containerDiv.innerHTML = '';
    createGrid(gridWidth);
    squaresInteractive();
})

//Create initial drawing color, and implement rainbow mode button
currentColor = 'blue';
randomColor = false;
randomBtn = document.querySelector('#randomBtn');
randomBtn.addEventListener('click', function(){
    randomColor = !randomColor;
    toggleRBtn();
})

//Implement eraser mode button
eraserMode = false;
eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.addEventListener('click', function(){
    eraserMode = !eraserMode;
    toggleEBtn();
})

//Implement clear grid button
clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', function(){
    containerDiv.innerHTML = '';
    createGrid(gridWidth);
    squaresInteractive();
})

//Implement mouseDown variable to check if mouse is clicking
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

//Initiate paintable grid
createGrid();
squaresInteractive();
