// HTML Variables
const blog = document.getElementById('blog');
const showBlog = document.getElementById('blogBtn');
const rules = document.getElementById('rules');
const showRules = document.getElementById('rulesBtn');
const clsBlog = document.getElementById('closeBlog');
const clsRules = document.getElementById('closeRules');
const play = document.getElementById('startBtn');
let game = null;
const gameOver = document.getElementById('gameOver');

// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let cWidth = canvas.width;
let cHeight = canvas.height;

// Paddle Variables
let xPaddle = (cWidth / 2 - 32);
let yPaddle = (cHeight - 10);
let wPaddle = 64;

// Ball variables
let x = (cWidth/2);
let y = (cHeight/2);
let bRadius = 8;
let dx = 0.2;
let dy = 3;

// Block Variables

let columns = 1;
let rows = 2;
let blocks = [];

let block = {
    x: 20,
    y: 20,
    width: 64,
    height: 16,
    show: true
}

block.x = (cWidth / rows) - block.width;
let verticalGap = ((cWidth - (block.width * rows)) / rows - 1);
const horizontalGap = 4;

// Canvas objects
function paddle() {
    ctx.beginPath();
    ctx.fillStyle = '#14B884';
    ctx.rect(xPaddle, yPaddle, wPaddle, 8);
    ctx.fill();
    ctx.closePath();
}

function ball() {
    ctx.beginPath();
    ctx.arc(x, y, bRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#FD4D0C';
    ctx.fill();
    ctx.closePath();
}

function createBlockLayout() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let copy = {...block};
            blocks.push(copy);
            block.y = (block.y + block.height + horizontalGap);
        }
        block.y = 20;
        block.x = (block.x + block.width + verticalGap);
    }
}

function putBlocks() {
    for (let each of blocks) {
        if (each.show === true) {
            ctx.beginPath();
            ctx.fillStyle = '#14B884';
            ctx.rect(each.x, each.y, each.width, each.height);
            ctx.fill();
            ctx.closePath();
        }
    }
}

function wallBounce(x, y) {
    if (x >= (cWidth - bRadius) || x <= + bRadius) {
        dx = -dx;
    } else if (y < (0 + bRadius)) {
        dy = -dy;
    }

    if (y >= (cHeight - bRadius)) {
        clearInterval(game);
        play.disabled = false;
        gameOver.style.visibility = 'visible';
    }
}

function paddleBounce(x, y, xPaddle, yPaddle) {
    if ((y + bRadius) >= yPaddle) {
        if ((x + bRadius) >= xPaddle && (x + bRadius) <= (xPaddle + wPaddle)) {
            dy = -dy;
        }
    }
}

function hitBlock(x, y, array) {
    let index;
    for (let each of array) {
        if ((y - bRadius) <= (each.y + each.height)) {
            if ((x + bRadius) >= each.x && (x + bRadius) <= (each.x + each.width)) {
                if (each.show) {
                    dy = -dy;
                    each.show = false;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, cWidth, cHeight);
    paddle();
    ball();
    putBlocks();
    wallBounce(x, y);
    paddleBounce(x, y, xPaddle, yPaddle);
    hitBlock(x, y, blocks);

    x += dx;
    y += dy;
    allBlocksGone(blocks);
}

createBlockLayout();

function newGame() {
    game = setInterval(draw, 5);
    
    x = (cWidth/2);
    y = (cHeight/2);
    xPaddle = (cWidth / 2 - 32);
    yPaddle = (cHeight - 10);
}

function allBlocksGone(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].show == true) {

        } else {
            console.log('winning');
            clearInterval(game);
        }
    }
}

// Event Listeners
// HTML Content Listners
showBlog.addEventListener('click', function() {
    blog.classList.remove('hidden');
})

showRules.addEventListener('click', function() {
    rules.classList.remove('hidden');
})

clsBlog.addEventListener('click', function() {
    blog.classList.add('hidden');
})

clsRules.addEventListener('click', function() {
    rules.classList.add('hidden');
})

play.addEventListener('click', function() {
    play.disabled = true;
    gameOver.style.visibility = 'hidden';
    setTimeout(newGame, 500);
});

// Game Listeners
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        xPaddle <= 0 ? xPaddle = 0 : xPaddle -= 8;
    } else if (e.key === 'ArrowRight') {
        xPaddle >= (cWidth - wPaddle) ? xPaddle = (cWidth - wPaddle) : xPaddle += 8;
    }
})