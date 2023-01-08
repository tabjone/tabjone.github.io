let dt = 10;

let height = 1000;
let width = 1000;

let bigBody;
let smallBody;



function circularVelocity(M, position1, position2)
{
    G = 1;
    r = sqrt(pow(position1.x - position2.x, 2) + pow(position1.y - position2.y, 2));
    return sqrt(G*M/r);
}

function setup() 
{
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
}

function draw() 
{
    background(0);

    smallBody.updatePosition(bigBody, dt);

    bigBody.draw();
    smallBody.draw();
    
}