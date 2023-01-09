let dt = 10;

let height = 1000;
let width = 1000;

let bigBody;
let smallBody;

let mousePosition;
let maxRadius;


function circularVelocity(M, position1, position2)
{
    G = 1;
    r = sqrt(pow(position1.x - position2.x, 2) + pow(position1.y - position2.y, 2));
    return sqrt(G*M/r);
}

function setup() 
{
    mousePosition = new createVector(0, 0);

    let massBigBody = 1;
    let massSmallBody = 1;

    let initialPositionBigBody = createVector(width/2, height/2);
    let initialVelocityBigBody = createVector(0, 0);

    let initialPositionSmallBody = createVector(0, 250).add(initialPositionBigBody);
    let speedSmallBody = circularVelocity(massBigBody, initialPositionBigBody, initialPositionSmallBody);
    
    let initialVelocitySmallBody = createVector(speedSmallBody, 0);

    bigBody = new Body(initialPositionBigBody, initialVelocityBigBody, massBigBody, 200);
    smallBody = new Body(initialPositionSmallBody, initialVelocitySmallBody, massSmallBody, 50);
    createCanvas(width, height);

    maxRadius = sqrt(pow(initialPositionBigBody.x-initialPositionSmallBody.x,2) + pow(initialPositionBigBody.y-initialPositionSmallBody.y,2))
                - 50/2 -3;

}


let growFactor = 5;

let minRaidus = 100;


function draw() 
{
    background(0);
    mousePosition.x = mouseX;
    mousePosition.y = mouseY;

    let mouseDistanceX = abs(mouseX - bigBody.position.x);
    let mouseDistanceY = abs(mouseY - bigBody.position.y);

    let mouseDistanceR = sqrt(pow(mouseDistanceX, 2) + pow(mouseDistanceY, 2));

    if (mouseDistanceR < bigBody.radius && bigBody.radius <= maxRadius)
    {
        bigBody.radius = bigBody.radius + growFactor;
        smallBody.angularVelocity = smallBody.angularVelocity + 1;
    }
    if (mouseDistanceR > bigBody.radius && bigBody.radius >= minRaidus)
    {
        bigBody.radius = bigBody.radius - growFactor;
    }

    smallBody.updatePosition(bigBody, dt);
    smallBody.updateRotation(dt, 0);

    bigBody.draw(true);
    smallBody.draw(false);
    

}