var rocket, rocketimg;
var bg, bgimg;
var planet1, planet1img, planet2, planet2img, planet3, planet3img;
var obstaclegroup1, obstaclegroup2, obstaclegroup3;
var play = 1;
var end = 0;
var gameState = play;
var score  = 0;
var reset, resetimg;
var sound;
var gamestart;
function preload(){
  rocketimg = loadImage("Images/rocket3.png");
  bgimg = loadImage("Images/unnamed.jpg");
  planet1img = loadImage("Images/planet1.png");
  planet2img = loadImage("Images/planet2.png");
  planet3img = loadImage("Images/planet3.png");
  resetimg = loadImage("Images/reset button.png");
 gamestart = loadSound("game start.ogg");
  sound = loadSound("Smashing sound effect.mp3");
}

function setup() {
  createCanvas(800,600);
  bg = createSprite(800,300,200,600);
  bg.addImage("back", bgimg);
  bg.scale = 5;
  rocket = createSprite(150, 200, 50, 50);
  rocket.addImage("Rocket", rocketimg);
  rocket.scale = 0.5;
  obstaclegroup1 = new Group();
  obstaclegroup2 = new Group();
  obstaclegroup3 = new Group();
  reset = createSprite(400,300,50,50);
reset.addImage("Resett", resetimg);
reset.visible = false;
reset.scale = 0.4;
  // planet2 = createSprite(300,300,50,50);
  // planet2.addImage("plan2", planet2img);
  // planet2.scale = 0.3;
  // planet3 = createSprite(200,200,50,50);
  // planet3.addImage("plan3", planet3img);
  // planet3.scale = 0.3;
}

function draw() {
  background("blue");
  if (gameState === play){
    if (frameCount % 3===0){
      score = score + 1;
    }
   
    if(keyDown("UP_ARROW")){
      rocket.y = rocket.y - 5;
    }
    if (keyDown("DOWN_ARROW")){
      rocket.y = rocket.y + 5;
    }
    bg.velocityX = -5;
    if (bg.x<0){
      bg.x = bg.width/2;
    }
    obstacle1();
    obstacle2();
    obstacle3();
    if (rocket.isTouching(obstaclegroup1)|| rocket.isTouching(obstaclegroup2)|| rocket.isTouching(obstaclegroup3)){
      gameState = end;
      sound.play();
    }
  } 
  else if(gameState === end){
bg.velocityX = 0;
obstaclegroup1.setVelocityXEach(0);
obstaclegroup2.setVelocityXEach(0);
obstaclegroup3.setVelocityXEach(0);
obstaclegroup1.setLifetimeEach(-1);
obstaclegroup2.setLifetimeEach(-1);
obstaclegroup3.setLifetimeEach(-1);
reset.visible = true;
  } 

  if (mousePressedOver(reset)){
   restart();
   gamestart.play();
  }
 
  drawSprites();
  fill("white");
  textSize(35);
  text("Score : " + score, 50,50);
}
function restart(){
  gameState = play;
  obstaclegroup1.destroyEach();
  obstaclegroup2.destroyEach();
  obstaclegroup3.destroyEach();
  score = 0;
  reset.visible = false;
}
function obstacle1(){
 // var a = random(100,150);
  if(frameCount % 150===0){
    console.log("hello");
  planet1 = createSprite(800,400,50,50);
  planet1.addImage("plan1", planet1img);
  planet1.scale = 0.5;
  planet1.velocityX = -4;
  planet1.y = random(10,580);
  planet1.lifetime = 220;
  //planet1.debug = true;
  planet1.setCollider("circle",0,0,90);
  obstaclegroup1.add(planet1);
  reset.depth = planet1.depth;
  reset.depth = reset.depth+1;
}
}

function obstacle2(){
  if(frameCount % 200===0){
  planet2 = createSprite(800,400,50,50);
  planet2.addImage("plan2", planet2img);
  planet2.scale = 0.1;
  planet2.velocityX = -6;
  planet2.y = random(10,580);
  planet2.lifetime = 135;
 // planet2.debug = true;
  planet2.setCollider("circle",0,0,310);
  obstaclegroup2.add(planet2);
  reset.depth = planet2.depth;
  reset.depth = reset.depth+1;
}
}

function obstacle3(){
  if(frameCount % 250===0){
  planet3 = createSprite(800,400,50,50);
  planet3.addImage("plan3", planet3img);
  planet3.scale = 0.1;
  planet3.velocityX = -8;
  planet3.y = random(10,580);
  planet3.lifetime = 100;
  //planet3.debug = true;
  planet3.setCollider("circle",0,0,340);
  obstaclegroup3.add(planet3);
  reset.depth = planet3.depth;
  reset.depth = reset.depth+1;
}
}
