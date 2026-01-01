let screen = 0;


let playButton;
let roseButton;
let lilyButton;


let catcherX;
let catcherY;
let catcherW = 120;
let catcherH = 20;
let catcherSpeed = 5;


let dropX, dropY;
let dropSize = 14;
let dropSpeed = 3;


let rockX, rockY;
let rockSize = 45;
let rockSpeed = 3;


let floorY = 370;


let score = 0;
let lives = 3;

function setup() {
    createCanvas(600, 400);
    textAlign(CENTER);
    textSize(18);

    // buttons
    playButton = createButton("Play");
    playButton.size(100, 40);
    playButton.mousePressed(() => {
        screen = 1;
        showSeedButtons();
    });

    roseButton = createButton("Rose");
    roseButton.size(100, 40);
    roseButton.mousePressed(() => {
        startGame();
    });

    lilyButton = createButton("Lily");
    lilyButton.size(100, 40);
    lilyButton.mousePressed(() => {
        startGame();
    });

    // start on home screen
    showPlayButton();
}

function draw() {
    if (screen === 0) {
        drawHome();
    } else if (screen === 1) {
        drawSeedScreen();
    } else if (screen === 2) {
        drawGame();
    }
}



function drawHome() {
    background("pink");

    textSize(22);
    text("My seedling", width / 2, 70);

    textSize(14);
    text(
        "Protect your seedling from the harsh, natural disaster\n" +
        "prone climate of Sanza. Your seedling is underground\n" +
        "and can't move, so it's up to you to protect it from\n" +
        "rocks while also making sure it gets water.",
        width / 2,
        130
    );


    playButton.position(width / 2 - 50, 260);
}

function drawSeedScreen() {
    background("paleturquoise");

    textSize(22);
    text("Choose a seed", width / 2, 90);

    textSize(14);
    text("(it doesn’t change the game yet)", width / 2, 120);


    roseButton.position(width / 2 - 140, 250);
    lilyButton.position(width / 2 + 40, 250);
}

function drawGame() {
    background("palegreen");

    // move catcher
    if (keyIsDown(LEFT_ARROW)) {
        catcherX -= catcherSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        catcherX += catcherSpeed;
    }
    catcherX = constrain(catcherX, 0, width - catcherW);


    dropY += dropSpeed;
    rockY += rockSpeed;

    fill(139, 69, 19);
    rect(0, floorY, width, height - floorY);

    fill(95, 158, 160);
    rect(catcherX, catcherY, catcherW, catcherH);

    fill(0, 128, 128);
    ellipse(dropX, dropY, dropSize);

    fill(128);
    rect(rockX, rockY, rockSize, rockSize);


    fill(0);
    textSize(14);
    text("Score: " + score + "   Lives: " + lives, width / 2, 25);

    // collisions
    if (circleRectHit(dropX, dropY, dropSize, catcherX, catcherY, catcherW, catcherH)) {
        score += 1;
        resetDrop();
    }

    if (rectRectHit(rockX, rockY, rockSize, rockSize, catcherX, catcherY, catcherW, catcherH)) {
        lives -= 1;
        resetRock();

        if (lives <= 0) {
            // reset to home
            screen = 0;
            score = 0;
            lives = 3;
            showPlayButton();
        }
    }

    if (dropY > floorY) resetDrop();
    if (rockY > floorY) resetRock();
}


function showPlayButton() {
    screen = 0;
    playButton.show();
    roseButton.hide();
    lilyButton.hide();
}

function showSeedButtons() {
    playButton.hide();
    roseButton.show();
    lilyButton.show();
}

function startGame() {
    screen = 2;


    playButton.hide();
    roseButton.hide();
    lilyButton.hide();

    catcherX = width / 2 - catcherW / 2;
    catcherY = 330;

    resetDrop();
    resetRock();

    score = 0;
    lives = 3;
}

function resetDrop() {
    dropX = random(20, width - 20);
    dropY = random(-200, -40);
    dropSpeed = random(2, 4);
}

function resetRock() {
    rockX = random(20, width - rockSize - 20);
    rockY = random(-300, -80);
    rockSpeed = random(2, 4);
}

//collision
function circleRectHit(cx, cy, d, rx, ry, rw, rh) {
    let r = d / 2;

    let closestX = constrain(cx, rx, rx + rw);
    let closestY = constrain(cy, ry, ry + rh);

    let dx = cx - closestX;
    let dy = cy - closestY;

    return dx * dx + dy * dy <= r * r;
}

function rectRectHit(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by
    );
}