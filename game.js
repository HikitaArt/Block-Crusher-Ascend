class Brick{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 38;
        this.height = 17;
        this.posX = x*this.width;
        this.posY = y*this.height;
    }
    drawMe(context){
        context.fillRect(45+(38+10)*this.x, 47+(17+10)*this.y, this.width, this.height);
    }
}
class Ball{
    constructor(r, speed){
        this.r = r;
        this.speed = speed;
        this.x = 400;
        this.y = 435;
    }
    drawMe(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
}
class Rocket{
    constructor(width){
        this.width = width;
        this.height = 17;
        this.x = 400-this.width/2;
        this.y = 450;
    }
    drawMe(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
function clearScreen(ctx, canvas){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
}
function createMap(arr){
    let map = [];
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 15; j++){
            if (arr[i][j] === 1){
                map.push(new Brick(j,i));
            }
        }
    }
    return map;
}
const leftMargin = 45;
const topMargin = 47;

let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";

let bricksArr = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

bricksMap = createMap(bricksArr);

let rocket = new Rocket(64);
let ball = new Ball(8, 2);

let gameLoop = setInterval(function(){
    clearScreen(ctx, canvas);
    bricksMap.forEach(function(brick){
        brick.drawMe(ctx);
    });
    ball.drawMe(ctx);
    rocket.drawMe(ctx);
}, 5);