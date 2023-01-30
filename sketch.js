let x, y;
let px, py;
let step = 5;
let stepSize = 40;
let numSteps = 3;
let state = 90;
let turnCounter = 1;
let totalSteps;

const spots = [];

function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  const cols = width / stepSize;
  const rows = height / stepSize;
  totalSteps = cols * rows;

  x = 0;
  y = 0;
  px = x;
  py = y;
  background(0);
}

class Spot {
  constructor(x, y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.isPrime = isPrime(step);
  }
  show() {
    if (!this.isPrime) {
      fill(45, 197, 244);
      rectMode(CENTER);
      push();
      translate(this.x, this.y);
      torus(0,3);
      pop();
    } else {
      let r = stepSize * 0.5;
      fill(random(0,500),random(0,500),random(0,500))
      push();
      translate(this.x, this.y);
      rotate(-PI / 4);
      let h = 100 + sqrt(this.step);
      translate(0, 0, h / 2);
      //sphere(r, r, h);
      //box(100,h)
      sphere(random(10, 40))
      
      pop();
    }
  }
}

function draw() {
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  //text(step, x, y);
  background(0);
  noStroke();
  translate(0, 0, -width / 2);
  rotateX(PI / 3);
  rotateZ(frameCount * 0.01);
 
  specularMaterial(random(0,500),random(0,500),random(0,500));
  lights(128,128,45,6);

  for (let s of spots) {
    s.show();
  }

  for (let n = 0; n < 2; n++) {
    spots.push(new Spot(x, y, step));

    px = x;
    py = y;

    switch (state) {
      case 0:
        x += stepSize;
        break;
      case 1:
        y -= stepSize;
        break;
      case 2:
        x -= stepSize;
        break;
      case 3:
        y += stepSize;
        break;
        
    }

    if (step % numSteps == 0) {
      state = (state + 1) % 4;
      turnCounter++;
      if (turnCounter % 2 == 0) {
        numSteps++;
      }
    }
    step++;
  }

 frameRate(20);
}