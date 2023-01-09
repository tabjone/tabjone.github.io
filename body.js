class Body {
  constructor(position, velocity, mass, diameter) 
  {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;

    this.radius = diameter/2;

    this.angularVelocity = 5;
  }
  updatePosition(other_body, dt)
  {
    let position1 = this.position;
    let position2 = other_body.position;    
    
    let G = 1;
    let r = sqrt(pow(position1.x - position2.x, 2) + pow(position1.y - position2.y, 2));
    
    
    let force_magnitude = - G * this.mass * other_body.mass / pow(r, 2);
    let direction = createVector(position1.x - position2.x, position1.y - position2.y).normalize();

    let force = direction.mult(force_magnitude);

    this.velocity.x = this.velocity.x + force.x/this.mass * dt;
    this.velocity.y = this.velocity.y + force.y/this.mass * dt;

    this.position.x = this.position.x + this.velocity.x * dt;
    this.position.y = this.position.y + this.velocity.y * dt;
  }

  updateRotation(dt, angularAddon){
    if (this.angularVelocity <= this.velocity.mag() / this.radius){
      this.angularVelocity = this.angularVelocity + angularAddon;
    }
    this.rotationAngle = this.rotationAngle + this.angularVelocity * dt;
    
  }


  draw(mainBody)
  {
    noFill();
    stroke(255);
    strokeWeight(3);
    circle(this.position.x, this.position.y, 2*this.radius);

    let d = this.radius;
    let theta = this.rotationAngle;
    

    let x1 = -d;
    let x2 = d;
    let y1 = 0;
    let y2 = 0;

    let c = cos(theta);
    let s = sin(theta);

    let x1_new = (x1 * c - y1 * s) + this.position.x;
    let y1_new = (x1 * s + y1 * c) + this.position.y;

    let x2_new = (x2 * c - y2 * s) + this.position.x;
    let y2_new = (x2 * s + y2 * c) + this.position.y;
  
    
    if (!mainBody){
      strokeWeight(3);
      //line(x1, y1, x2, y2);
      line(x1_new, y1_new, x2_new, y2_new);


    }
  }
}