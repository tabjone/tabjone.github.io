class Body {
  constructor(position, velocity, mass, radius) 
  {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.radius = radius;
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
  draw()
  {
    noFill();
    stroke(255);
    strokeWeight(3);
    circle(this.position.x, this.position.y, this.radius);
  }
}