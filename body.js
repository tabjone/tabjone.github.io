class Body {
  constructor(position, velocity, mass, diameter) 
  {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;

    this.radius = diameter/2;

    this.angularVelocity = 0;
    this.rotationAngle = 0;
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

  updateRotation(dt, angularAddon, other_body){
    let distance = sqrt(pow(this.position.x - other_body.position.x,2) + pow(this.position.y - other_body.position.y, 2));
    
    if (abs(this.angularVelocity) <= this.velocity.mag() / distance){
      this.angularVelocity = this.angularVelocity + angularAddon;
    }
    this.rotationAngle = this.rotationAngle + this.angularVelocity * dt;
  }


  globalCoordinates(localCoordinates){
    let pos = new createVector(localCoordinates.x + this.position.x, localCoordinates.y + this.position.y);
    return pos
  }


  draw(mainBody)
  {
    let localCircleCentre = new createVector(0, 0);
    let globalCircleCentre = this.globalCoordinates(localCircleCentre);


    noFill();
    stroke(255);
    strokeWeight(3);
    circle(globalCircleCentre.x, globalCircleCentre.y, 2*this.radius);

    let d = this.radius;
    let theta = this.rotationAngle;

    let c = cos(theta);
    let s = sin(theta);
    
    
    let left = new createVector(-d*c, d*s);
    let right = new createVector(d*c, d*s);
    let bottom = new createVector(d*s, -d*c);
    let top = new createVector(-d*s, d*c);


    let leftGlobal = this.globalCoordinates(left);
    let rightGlobal = this.globalCoordinates(right);
    let bottomGlobal = this.globalCoordinates(bottom);
    let topGlobal = this.globalCoordinates(top);
  
    if (!mainBody){
    strokeWeight(3);
    line(bottomGlobal.x, bottomGlobal.y, topGlobal.x, topGlobal.y);    
    }
  }
}