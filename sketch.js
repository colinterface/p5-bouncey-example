var particles = [];
var maxSpeed = 3;
var particleSize = 4;
var gravityEnabled = true;
var bounceSound;
var maxBounces = 10;


function preload() {
  bounceSound = loadSound('/assets/sound.mp3');
  bounceSound.setVolume(0.1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255, 255, 255);
  background("#222");
}

function draw() {
  background("#222");
  // if (mouseIsPressed) {
  //   particles.push(new Particle(mouseX, mouseY, particleSize));
  // }

  particles.forEach(function(particle) {
    particle.move();
    particle.display();
  });
}

function keyPressed() {
  if (keyCode === 32) {
    gravityEnabled = ! gravityEnabled;
  } else {
    particles = [];
    background("#222");
  }

}

function mouseClicked() {
  particles.push(new Particle(mouseX, mouseY, particleSize));
}

function Particle(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.horizontalSpeed = random(-maxSpeed, maxSpeed);
  this.verticalSpeed = random(-maxSpeed, maxSpeed);
  this.bounces = 0;
  this.enabled = true;

  this.move = function() {

    if (this.x > width || this.x < 0) {
      this.horizontalSpeed *= -0.7;
      this.bounces++;
      if (this.bounces > maxBounces) {
        this.enabled = false;
      }
      this.enabled && bounceSound.play();
    }

    if (this.y > height || this.y <= 0) {
      console.log("BOUNCING ON BOTTOM");
      this.verticalSpeed *= -0.7;
      this.bounces++;
      if (this.bounces > maxBounces) {
        this.enabled = false;
      }
      this.enabled && bounceSound.play();
    }

    if (gravityEnabled) {
      this.verticalSpeed += 0.7;
    }

    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;
  }

  this.display = function() {
    this.enabled && ellipse(this.x, this.y, this.size, this.size)
  }


}
