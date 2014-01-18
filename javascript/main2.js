// var gamejs = require('gamejs');
// var box2d = require('./Box2dWeb-2.1.a.3');
// var vectors = require('gamejs/utils/vectors');
// var math = require('gamejs/utils/math');

var world;
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;


function main(){
    //alert('sdkfjh');
    //console.log($('canvas'));
    
    ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    canvasWidth = parseInt(canvasElm.width);
    canvasHeight = parseInt(canvasElm.height);
    canvasTop = parseInt(canvasElm.style.top);
    canvasLeft = parseInt(canvasElm.style.left);


    var worldAABB = new b2AABB();
    console.log(worldAABB);
    worldAABB.minVertex.Set(0, 0);
    worldAABB.maxVertex.Set(700, 500);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    world = new b2World(worldAABB, gravity, doSleep); 

    createBox(world, 0, 125, 10, 250);
    createBox(world, 500, 125, 10, 250);
    createGround(world);

    var x = 40;
    var y = 40;

    var circleSd = new b2CircleDef();
    circleSd.density = 1.0;
    circleSd.radius = 20;
    circleSd.restitution = 1;
    circleSd.friction = 0;
    //circleSd.localPosition.Set(x,y);

    var circleBd = new b2BodyDef();
    circleBd.AddShape(circleSd);
    circleBd.position.Set(x,y);
    var circleBody = world.CreateBody(circleBd);


    // var distance_joint = new b2DistanceJointDef();
    // distance_joint.body1 = world.GetGroundBody();
    // distance_joint.body2 = circleBody;
    // //connect the centers - center in local coordinate - relative to body is 0,0
    // //distance_joint.localAnchor1 = new b2Vec2(0, 0);
    // //distance_joint.localAnchor2 = new b2Vec2(0, 0);
    // //length of joint
    // distance_joint.length = 3;
    // distance_joint.collideConnected = true;
     
    // //add the joint to the world
    // world.CreateJoint(distance_joint);

    // var jointDef = new b2DistanceJointDef();
    // console.log(jointDef);
    // // var body1 = world.GetGroundBody();
    // // var body2 = circleBody;
    // //jointDef.Initialize(body1, body2, body1.GetWorldCenter());
    // jointDef.anchorPoint.Set(250, 66);
    // jointDef.body1 = world.GetGroundBody();
    // jointDef.body2 = circleBody;
    // world.CreateJoint(jointDef);

    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(250, 66);
    jointDef.body1 = world.GetGroundBody();
    jointDef.body2 = circleBody;
    world.CreateJoint(jointDef);

    step();
}


function step(){
    console.log('step');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    //     var context = ctx;
    // context.strokeStyle = '#ffffff';
    // context.beginPath();
    // context.moveTo(0, 0);
    // context.lineTo(100, 100);
    // context.stroke();
    //return;

    var timeStep = 1.0/60;
    var iteration = 1;
    world.Step(timeStep, iteration);

    drawWorld(world, ctx);

    setTimeout(step, 10);
}

//gamejs.ready(main);
Event.observe(window, 'load', function() {

main();
});








function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep);
    createGround(world);
    createBox(world, 0, 125, 10, 250);
    createBox(world, 500, 125, 10, 250);
    return world;
}

function createGround(world) {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(1000, 50);
    groundSd.restitution = 0.0;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(-500, 340);
    return world.CreateBody(groundBd)
}

function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 20;
    ballSd.restitution = 1.0;
    ballSd.friction = 0;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x,y);
    return world.CreateBody(ballBd);
}

function createBox(world, x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    return world.CreateBody(boxBd)
}


