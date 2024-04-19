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
function selectCell(event, context, rect){
    let mouseX = 45 + Math.floor(((event.clientX-rect.left)-45)/48)*48;
    let mouseY = 47 + Math.floor(((event.clientY-rect.top)-47)/27)*27;
    console.log(mouseX, mouseY);
    if (mouseX >= 0 && mouseX <= 717 && mouseY >= 21 && mouseY <= 263){
        clearScreen(context);
        context.strokeRect(mouseX, mouseY, 38, 17);
    }
}

let canvas = document.getElementsByTagName("canvas")[0];
let screen = canvas.getBoundingClientRect();
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 2;

drawBallPlate(ctx);

canvas.onmousemove = function(event){
    selectCell(event, ctx, screen);
}