function drawBallPlate(context){
    context.beginPath();
    context.arc(400, 435, 8, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();

    context.fillRect(400-32, 450, 64, 17);
}

let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";

drawBallPlate(ctx);