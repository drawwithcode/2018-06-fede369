var myData;
var check = 0;
var checkBG = 0;
var myImage;
var myDelta = 0;

function preload() {
  // put preload code here
  myData = loadJSON("./assets/peopleinspace.json");
  myImage = loadImage("./assets/pizzaiolo.jpg");
}

var balls = [];

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  //cnv.mousePressed(changeBackground);
  for (var i = 0; i < myData.menù.length; i++) {
    var astro = myData.menù[i];

    var x = random(width);
    var y = random(height);
    var d = astro.dim + 25;
    var l = astro.name;
    var s = astro.info;
    var launch = astro.drink;

    var newBall = new Ball(x, y, d, l, s, launch);
    balls.push(newBall);
  }
}

function draw() {
  image(myImage, 0, 0, [width], [height]);

  for (var j = 0; j < balls.length; j++) {
    balls[j].move();
    balls[j].display();
  }
}

function Ball(_x, _y, _diameter, _label, _label2, _label3) {
  // Properties defined by constructor
  this.size = _diameter;
  this.x = _x;
  this.y = _y;
  this.label = _label;
  this.label2 = _label2;
  this.label3 = _label3;

  // Hardcoded properties
  this.color = "red";
  this.speed = 1;
  this.yDir = 1;
  this.xDir = 1;

  // Methods
  this.move = function() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;

    if (this.y >= height || this.y <= 0) {
      // if 1, set to -1, if -1, set to 1
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  };

  this.display = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
    if (check == 1) {
      fill("black");
      textSize(20);
      text(this.label, this.x + 25, this.y);
    } else if (check == 2) {
      fill("black");
      textSize(20);
      text(this.label, this.x + 25, this.y);
      textSize(15);
      text(this.label2, this.x + 25, this.y + 25);
    } else if (check == 3) {
      fill("black");
      textSize(20);
      text(this.label, this.x + 25, this.y);
      textSize(15);
      text(this.label2, this.x + 25, this.y + 25);
      text(this.label3, this.x + 25, this.y + 50);
    } else if (check > 3) {
      fill("black");
      textSize(40);
      text("BUON APPETITO!", width / 5, (height / 6) * 5 + 50);
    } else {
      fill("black");
      textSize(30);
      text("Scopri i menù del giorno", width / 5, (height / 6) * 5 + 50);
    }
  };
}

function mouseClicked() {
  check += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
