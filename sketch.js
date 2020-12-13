var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  FoodGroup = new Group();
  obstacleGroup = new Group();

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  
  //monkey.debug = true;
}


function draw() {
  background("white");

  if (ground.x < 390) {
    ground.x = ground.width / 2;
  }
  
  if(keyDown("space") && monkey.y >=310){
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.7;
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Score: " + score,300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,130,120);
  
  if(monkey.isTouching(FoodGroup)){
    score = score + 1;
    FoodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup)){
    score = 0;
  }
  
  monkey.collide(ground);
  
  spawnobstacles();
  spawnfood();

  drawSprites();

}

function spawnobstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(410, 327, 20, 20);
    obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
    obstacleGroup.lifetime = 140;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
  }
}

function spawnfood(){
  if(frameCount % 80 === 0){
    banana = createSprite(410,320,20,20);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 140;
    FoodGroup.add(banana);
    banana.y = Math.round(random(220,300));
  }
}