var bg , bgImg
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var ground;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImg = loadImage("jungle.jpg")
}



function setup() {
  //creating monkey
  
  bg = createSprite(500,380);
  bg.addImage( bgImg)
  bg.velocityX=-4
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  //ground           
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
   
  console.log(ground.x) 

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  


stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 100,50);
  
 if (ground.x<0){
   ground.x=ground.width/2
   
   
 } 
  if(bg.x<0){
    bg.x=bg.width/2
  }
  if (keyDown("space")){
    monkey.velocityY=-12    
    
    
  }
  monkey.velocityY=monkey.velocityY+1
  monkey.collide(ground)
  
if (FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
}
  switch(score){
    case 10:monkey.scale=0.12
      break;
      case 20:monkey.scale=0.14
       break;
    case 30:monkey.scale=0.16
      break;
      case 40:monkey.scale=0.18 
        break;
        default:monkey.scale=0.2
  }
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.08
    
  }
  obstacles();
  food();
drawSprites();
  textSize(20);
  fill("white");
  text("Score: "+ score, 20,50);
  

}

//food (banana)
function food(){
  if(frameCount%80===0)
{
 var banana=createSprite(500,165,10,40); 
   banana.y= Math.round(random(120,200));
  banana.velocityX = -3;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=200;
  
  FoodGroup.add(banana);
}
}
//obstacle rock
function obstacles(){
   if (frameCount % 200 === 0){
   var obstacle = createSprite(500,330,10,40);
    obstacle.velocityX = -3;
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.1;
     obstacle.lifetime=200;
     
     obstacleGroup.add(obstacle);
   }
}
