window.addEventListener('DOMContentLoaded', function() {

    // HTML Variables
    const blog = document.getElementById('blog');
    const showBlog = document.getElementById('blogBtn');
    const rules = document.getElementById('rules');
    const showRules = document.getElementById('rulesBtn');
    const clsBlog = document.getElementById('closeBlog');
    const clsRules = document.getElementById('closeRules');

    const speedSet = document.getElementById('speedSlider');
    const rowSet = document.getElementById('rowSlider');
    const colSet = document.getElementById('columnSlider');
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
    let speed = 20;
    let bRadius = 8;

    let x = (cWidth/2);
    let y = (cHeight/2);
    let dx = 0.9;
    let dy = 3;
    
    // Block Variables
    let columns = 8;
    let rows = 3;
    let blocks = [];
    const gap = 4;
    
    let block = {
        x: (cWidth - ((this.width + gap) * columns)) / 2,
        y: 60,
        width: 64,
        height: 16,
        show: true
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
        setTimeout(newGame, 500);
    });
    
    // Game Listeners
    speedSet.addEventListener('change', function() {
        speed = speedSet.value;
        console.log(speed);
    })

    rowSet.addEventListener('change', function() {
        rows = rowSet.value;
        console.log(rows);
    })

    colSet.addEventListener('change', function() {
        columns = colSet.value;
        console.log(columns);
    })

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            xPaddle <= 0 ? xPaddle = 0 : xPaddle -= 8;
        } else if (e.key === 'ArrowRight') {
            xPaddle >= (cWidth - wPaddle) ? xPaddle = (cWidth - wPaddle) : xPaddle += 8;
        }
    })
    
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
                block.x = (block.x + block.width + gap);
            }
            if (i % 2 == 1) {
                block.x = (cWidth - ((block.width + gap) * columns)) / 2;
                block.y = (block.y + block.height + gap);
            } else {
                block.x = (cWidth - ((block.width + gap) * columns)) / 2 + (block.width/2);
                block.y = (block.y + block.height + gap);
            }
        }
    }
    
    function resetBlockLayout() {
        for (let each of blocks) {
            each.show = true;
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
            chickenDinner(false);
        }
    }
    
    function paddleBounce(x, y, xPaddle, yPaddle) {
        if ((y + bRadius) >= yPaddle) {
            if ((x + bRadius) >= xPaddle && x < (xPaddle + (wPaddle / 2 - 8))) {
                dy = -dy;
                dx = -0.9;
            } else if (x > (xPaddle + (wPaddle / 2 + 8)) && (x - bRadius) <= (xPaddle + wPaddle)) {
                dy = -dy;
                dx = 0.9;
            } else if (x >= (xPaddle + (wPaddle / 2 - 8)) && x <= (xPaddle + (wPaddle / 2 + 8))) {
                dy = -dy;
                dx = 0;
            }
        }
    }
    
    function hitBlock(x, y, array) {
        for (let each of array) {
            if (((y - bRadius <= each.y + each.height) && (y + bRadius >= each.y + each.height)) || ((y + bRadius >= each.y) && (y - bRadius <= each.y))) {
                if ((x + bRadius) >= each.x && (x - bRadius) <= (each.x + each.width)) {
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
    
    function newGame() {
        play.disabled = true;
        gameOver.classList.remove('win');
        gameOver.style.visibility = 'hidden';
        blocks = [];
        block = {
            x: (cWidth - ((block.width + gap) * columns)) / 2,
            y: 60,
            width: 64,
            height: 16,
            show: true
        }
        x = (cWidth/2);
        y = (cHeight/2);
        xPaddle = (cWidth / 2 - 32);
        yPaddle = (cHeight - 10);
        createBlockLayout();
        resetBlockLayout();

        game = setInterval(draw, speed);
    }

    function chickenDinner(win) {
        if (win) {
            clearInterval(game);
            play.disabled = false;
            gameOver.classList.add('win');
            gameOver.style.visibility = 'visible';
            gameOver.innerHTML = 'You win'
        } else {
            clearInterval(game);
            play.disabled = false;
            gameOver.innerHTML = 'Game Over';
            gameOver.style.visibility = 'visible';
        }
    }
    
    function allBlocksGone(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].show == true) {
                return false;
            } 
        }
        chickenDinner(true);
    }
    
})
