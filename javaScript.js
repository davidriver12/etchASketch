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

containerDiv = document.querySelector('#container');
let gridWidth = 16;

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

currentColor = 'black';
randomColor = false;
randomBtn = document.querySelector('#randomBtn');
randomBtn.addEventListener('click', function(){
    randomColor = !randomColor;
})

eraserMode = false;
eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.addEventListener('click', function(){
    eraserMode = !eraserMode;
})

clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', function(){
    containerDiv.innerHTML = '';
    createGrid(gridWidth);
    squaresInteractive();
})

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

createGrid();
squaresInteractive();
