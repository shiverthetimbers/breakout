// HTML Variables
const blog = document.getElementById('blog');
const showBlog = document.getElementById('blogBtn');
const rules = document.getElementById('rules');
const showRules = document.getElementById('rulesBtn');
const clsBlog = document.getElementById('closeBlog');
const clsRules = document.getElementById('closeRules');

// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let cWidth = canvas.width;
let cHeight = canvas.height;

// Paddle Variables
let xRect = (cWidth / 2 - 32);
let yRect = 690
let widthRect = 64;

// Ball variables
let x = (cWidth/2);
let y = (cHeight/2);
let bRadius = 8;
let dx = 2;
let dy = 3;


// Canvas objects
function paddle() {
    ctx.beginPath();
    ctx.fillStyle = '#14B884';
    ctx.rect(xRect, yRect, widthRect, 8);
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

function wallBounce(x, y) {
    if (x >= (cWidth - bRadius) || x <= + bRadius) {
        dx = -dx;
    } else if (y < (0 + bRadius)) {
        dy = -dy;
    }

    if (y >= (cHeight - bRadius)) {
        console.log('game over');
    }
}

function paddleBounce(x, y, xRect, yRect) {
    if ((y + bRadius) >= yRect) {
        if ((x + bRadius) >= xRect && (x + bRadius) <= (xRect + widthRect)) {
            dy = -dy;
        }
    }
}

// function orb() {
//     ctx.beginPath();
//     ctx.arc((cWidth/2), (cHeight/2), 12, Math.PI * 2, false);
//     ctx.fillStyle = '#666';
//     ctx.stroke();
//     ctx.closePath();
// }

function draw() {
    ctx.clearRect(0, 0, cWidth, cHeight);
    paddle();
    ball();
    wallBounce(x, y);
    paddleBounce(x, y, xRect, yRect);

    x += dx;
    y += dy;
}

setInterval(draw, 30);

// Event Listeners
// Rules and Blog Listners
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

// Canvas Listeners
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        xRect <= 0 ? xRect = 0 : xRect -= 8;
    } else if (e.key === 'ArrowRight') {
        xRect >= (cWidth - widthRect) ? xRect = (cWidth - widthRect) : xRect += 8;
    }
})

