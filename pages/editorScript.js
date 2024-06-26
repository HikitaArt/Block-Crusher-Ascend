function drawBallPlate(context){
    context.beginPath();
    context.arc(400, 435, 8, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();

    context.fillRect(400-32, 450, 64, 17);
}
function clearScreen(context){
    context.fillStyle = "black";
    context.fillRect(0, 0, 765, 290);
    context.fillStyle = "white";
}
function drawingBricks(context, map){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 15; j++){
            if (map[i][j] === 1){
                context.fillRect(45 + j*48, 47 + i*27, 38, 17);
            }
            if (map[i][j] === 2){
                context.fillStyle = "gray";
                context.fillRect(45 + j*48, 47 + i*27, 38, 17);
                context.fillStyle = "white";
            }
        }
    }
}
function selectCell(event, rect){
    let mouseX = 45 + Math.floor(((event.clientX-rect.left)-45)/48)*48;
    let mouseY = 47 + Math.floor(((event.clientY-rect.top)-47)/27)*27;
    if (mouseX >= 0 && mouseX <= 717 && mouseY >= 21 && mouseY <= 263){
        selectedCellX = mouseX;
        selectedCellY = mouseY;
    }
}
function drawSelectedCell(context,x,y){
    context.strokeRect(x,y,38,17);
}
function click(event){
    let x = Math.floor(((event.clientX-screen.left)-45)/48);
    let y = Math.floor(((event.clientY-screen.top)-47)/27);
    if (x >= 0 && x < 15 && y >= 0 && y < 9){
        bricksMap[y][x] = filling;
    }
}
function changeFilling(event){
    let lastBut = document.getElementsByClassName("selected-but")[0];
    lastBut.classList.remove("selected-but");
    event.target.classList.add("selected-but");
    filling = parseInt(event.target.id);
}
function download(){
    let rows = new Array();
    for (let i = 0; i < 9; i++){
        rows.push(bricksMap[i].join(','));
    }
    let textList = rows.join('\n');
    let blob = new Blob([textList], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "brick-map.txt";
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

let canvas = document.getElementsByTagName("canvas")[0];
let screen = canvas.getBoundingClientRect();
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 2;

let bricksMap = new Array();
let filling = 1;

let selectedCellX = 0;
let selectedCellY = 0;

for (let i = 0; i < 9; i++){
    bricksMap.push([]);
    for (let j = 0; j < 15; j++){
        bricksMap[i].push(0);
    }
}

drawBallPlate(ctx);

canvas.onmousemove = function(event){
    selectCell(event, screen);
}
canvas.onmousedown = function(event){
    click(event);
    canvas.addEventListener("mousemove", click);
}
canvas.onmouseup = function(){
    canvas.removeEventListener("mousemove", click);
    canvas.onmousemove = function(event){
        selectCell(event, screen);
    }
};

let screenUpdate = setInterval(function(){
    clearScreen(ctx);
    drawingBricks(ctx, bricksMap);
    drawSelectedCell(ctx,selectedCellX,selectedCellY);
}, 5);