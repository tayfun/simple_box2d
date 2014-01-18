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
    worldAABB.maxVertex.Set(1500, 1500);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    world = new b2World(worldAABB, gravity, doSleep); 


    var x = 40;
    var y = 40;

    var circleSd = new b2CircleDef();
    circleSd.density = 1.0;
    circleSd.radius = 20;
    circleSd.restitution = 1.0;
    circleSd.friction = 0;
    circleSd.localPosition.Set(x,y);
    var circleBd = new b2BodyDef();
    circleBd.AddShape(circleSd);
    circleBd.position.Set(x,y);
    var circleBody = world.CreateBody(circleBd);

    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(250, 200);
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

