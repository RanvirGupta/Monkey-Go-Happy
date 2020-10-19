var monkey,monkey_running;
var bananaImage,bananaGroup;
var jungle,jungle_img;
var stone_img,stone_group;
var score=0;
var invisible_ground;
var PLAY=1;
var END=0;
var gameState=PLAY

function preload() {
  
  monkey_running=    loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  jungle_img=loadImage("jungle.jpg");
  stone_img=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
}
function setup() {
  createCanvas(600,600);
   
  jungle=createSprite(200,180,400,20);
  jungle.addImage("jungle",jungle_img);
  jungle.x=jungle.width/2;
  jungle.velocityX=-(4+3*score/100);
  jungle.scale=1.5;
  
  monkey= createSprite(100,150,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.11;
  
  invisible_ground=createSprite(200,450,400,20);
  invisible_ground.visible=false;
 
  bananaGroup = new Group();
  
  stone_group = new Group();
}
function draw() {
  background(255);
  
  jungle.velocityX=-4;
   
  if(gameState===PLAY){
    jungle.velocityX=-4;
  if (jungle.x<0){
    jungle.x=jungle.width/2
  }
   if(keyDown("space")) {
      monkey.velocityY = -10;   
  }
    monkey.velocityY = monkey.velocityY + 0.8
    
    monkey.collide(invisible_ground);
    rock();
    fruit();
      
  if (bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;  
    case 30:monkey.scale=0.16;
      break; 
    case 40:monkey.scale=0.18;
      break;  
    default: break;  
  } 
  
   if (stone_group.isTouching(monkey)){
    gameState=END;
  }
  }
    if(gameState===END){
     jungle.velocityX=0;
     bananaGroup.setVelocityXEach(0);
     stone_group.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(-1);
     stone_group.setLifetimeEach(-1);
   } 
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 460,50);
}
function rock(){
 if(frameCount % 300 === 0) {
    var stone = createSprite(600,400,10,40);
    stone.velocityX = -6;
    
    stone.addImage(stone_img);
    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.15;
    stone.lifetime = 100;
    //add each obstacle to the group
    stone_group.add(stone);
  } 
}
function fruit(){
  if (frameCount % 80 === 0) {
   var banana = createSprite(350,200,40,10);
    banana.y = Math.round(random(350,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //add each cloud to the group
    bananaGroup.add(banana);
}
}
