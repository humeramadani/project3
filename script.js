
let paths = [];

let painting = false;

let next = 0;

let current;
let previous;

function setup() {
  createCanvas(1600,3300);
  
  
  current = createVector(0,0);
  previous = createVector(0,0);
};

function draw() {


background(0);
  

  if (millis() > next && painting) {

  
    current.x = mouseX;
    current.y = mouseY;

  
    let force = p5.Vector.sub(current, previous);
    force.mult(0.08);

  
    paths[paths.length - 1].add(current, force);
    
    next = millis() + random(200);

    previous.x = current.x;
    previous.y = current.y;
  }

  for( let i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}


function mouseReleased() {
  painting = false;
}

class Path {
  constructor() {
    this.particles = [];
    this.hue = random(100);
  }

  add(position, force) {
    // Add a new particle with a position, force, and hue
    this.particles.push(new Particle(position, force, this.hue));
  }
  
  
  update() {  
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }  

  display() {    

    for (let i = this.particles.length - 1; i >= 0; i--) {
   
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);

      } else {
        this.particles[i].display(this.particles[i+1]);
      }
    }
  
  }  
}

class Particle {
  constructor(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    this.drag = 0.96;
    this.lifespan = 255;
  }



  update() {
    // Move it
    this.position.add(this.velocity);
    // Slow it down
    this.velocity.mult(this.drag);
    // Fade it out
    this.lifespan--;
  }

  // Draw particle and connect it with a line
  // Draw a line to another
  display(other) {
    stroke(255, this.lifespan);
    fill(255, this.lifespan/6);    
    ellipse(this.position.x,this.position.y, 8, 8);    
    // If we need to draw a line
    if (other) {
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }
}