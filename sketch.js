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
  if (mouseIsPressed) {
    var particle = new Particle(mouseX, mouseY, particleSize)
    particle.index = particles.push(particle) - 1;
  }

  particles.forEach(function(particle) {
    if (particle) {
      particle.move();
      particle.display();
    }
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

function removeParticle(particle){
 particles[particle.index] = undefined;
}

function Particle(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.horizontalSpeed = random(-maxSpeed, maxSpeed);
  this.verticalSpeed = random(-maxSpeed, maxSpeed);
  this.bounces = 0;
}

Particle.prototype.display = function() {
  ellipse(this.x, this.y, this.size, this.size)
};

Particle.prototype.move = function() {
  if (this.x > width || this.x < 0) {
    this.horizontalSpeed *= -0.7;
    this.bounces++;
    if (this.bounces > maxBounces) {
      return removeParticle(this);
    }
    this.playSound();
  }

  if (this.y > height || this.y <= 0) {
    console.log("BOUNCING ON BOTTOM");
    this.verticalSpeed *= -0.7;
    this.bounces++;
    if (this.bounces > maxBounces) {
      return removeParticle(this);
    }
    this.playSound();
  }

  if (gravityEnabled) {
    this.verticalSpeed += 0.7;
  }

  this.x += this.horizontalSpeed;
  this.y += this.verticalSpeed;
};

Particle.prototype.playSound = function() {
  // debounce
  // this.bounces
  bounceSound.play();
}
