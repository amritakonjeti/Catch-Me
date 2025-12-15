//Press a button to choose your path
//See the README file for more information

/* VARIABLES */
let enterButton;
let a1Button;
let a2Button;
let b1Button;
let b2Button;
let screen = 0;
let catcher;
let fallingObject;
let rock;
let floor;

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600, 400);
  textAlign(CENTER);
  textSize(20);
  noStroke();

  // Create buttons for all screens
  enterButton = new Sprite(width / 2, height / 2 + 100);
  enterButton.w = 100;
  enterButton.h = 50;
  enterButton.collider = 'k';
  enterButton.color = 'whitesmoke';
  enterButton.text = 'Play';

  a1Button = new Sprite(-200, -200);
  a2Button = new Sprite(-50, -50);
  b1Button = new Sprite(-100, -100);
  b2Button = new Sprite(-150, -150);

  console.log("working");
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    // Home screen
    background("pink");
    textAlign(CENTER);
    textSize(20);
    noStroke();
    text(
      "My seedling",
      width / 2,
      height / 2 - 100
    );
    text(
      "Protect your seedling from the harsh, natural disaster \nprone climate of Sanza. Your seedling is underground \nand unable to move, so its up to you to protect it from \nall  rocks while also making sure it gets water.",
      width / 2,
      height / 2 - 50
    );

    // Check enter button
    if (enterButton.mouse.presses()) {
      print("pressed");
      showScreen1();
      screen = 1;
    }
  } else if (screen == 1) {
    // Screen 1 - Choose a seed
    background("paleturquoise");
    textAlign(CENTER);
    textSize(20);
    noStroke();
    text("Choose a seed", width / 2, height / 2 - 100);

    if (a1Button.mouse.presses()) {
      print("Display screen 2");
      showScreen2();
      screen = 2;
    } else if (a2Button.mouse.presses()) {
      print("Display screen 2");
      showScreen2();
      screen = 2;
    }
  } else if (screen == 2) {
    // Game screen
    background("palegreen");

    if (kb.pressing("left")) {
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }
  }
}

/* FUNCTIONS TO DISPLAY SCREENS */
function showScreen1() {
  enterButton.pos = { x: -100, y: -100 };

  // Add A1 button
  a1Button.pos = { x: width / 2 - 100, y: height / 2 + 100 };
  a1Button.w = 100;
  a1Button.h = 50;
  a1Button.collider = 'k';
  a1Button.color = 'whitesmoke';
  a1Button.text = 'Rose';

  // Add A2 button
  a2Button.pos = { x: width / 2 + 100, y: height / 2 + 100 };
  a2Button.w = 100;
  a2Button.h = 50;
  a2Button.collider = 'k';
  a2Button.color = 'whitesmoke';
  a2Button.text = 'Lily';
}

function showScreen2() {
  catcher = new Sprite(200, 345, 100, 20, "k");
  catcher.color = color(95, 158, 160);

  //Create falling object
  fallingObject = new Sprite(100, 0, 10);
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = 2;

  //create rock
  rock = new Sprite(300, 0, 10);
  rock.color = color(128, 128, 128);
  rock.width = 50;
  rock.height = 50;
  rock.vel.y = 2;

  // create floor
  floor = new Sprite(width / 2, 380, 500, 50, "k");
  floor.color = color(139, 69, 19);

  // Move extra buttons off screen
  a1Button.pos = { x: -200, y: -200 };
  a2Button.pos = { x: -50, y: -50 };
}
