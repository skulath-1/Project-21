var girl,railway,prison,stone,coin,invisible;
var girlImg,railwayImg,prisonImg,stoneImg,coinImg;
var obstaclesGroup,coinsGroup;
var gameState="play";
var gamestate= "end";
var score=0


function preload(){

girlImg = loadImage("girlRunning.png")
railwayImg = loadImage("RailwayImg.png")
prisonImg = loadImage("prisonImag.png")
stoneImg = loadImage("stone.png")
coinImg = loadImage("coinImg.png")

}

function setup() {
  createCanvas(800,500)

  girl = createSprite(400,400,100,100)
  girl.addImage("girlImg",girlImg)
  girl.scale=0.3

  railway = createSprite(400,250,800,500)
  railway.addImage("RailwayImg",railwayImg)
  railway.scale= 2

  invisible = createSprite(450,500,300,70)
  invisible.visible = false;

  //adding depth
  girl.depth=railway.depth
  girl.depth=girl.depth+1

  obstaclesGroup = new Group();
  coinsGroup = new Group();
 
  score=0
}

function draw() {
    background("railwayImg")
    textSize(20)
    fill("black")
    text("Score: "+score,30,50)

    if (gameState==="play"){
      
    if(coinsGroup.isTouching(girl)){
      score=score+1

  }

   if((touches.length > 0 || keyDown("SPACE")) && girl.y  >= height-120) {
      girl.velocityY = -10;
      touches = [];
  }
     
     if (keyDown("left_arrow")){
       girl.x= girl.x-3
     }

     if (keyDown("right_arrow")){
       girl.x= girl.x+3
     }

     if (keyDown("space")){
       girl.velocityY=-10
     }
    
    //adding gravity
     girl.velocityY=girl.velocityY+1

     //infite scorrling effect
     if(railway.y > 400){
      railway.y = 300
    }

    girl.collide(invisible)
    spawnObstacles()
    spawnCoins()

    if(obstaclesGroup.isTouching(girl)){
      gameState = "end";

  }
}
else if (gameState === "end") {

  //set velcity of each game object to 0
  railway.velocityX = 0;
  girl.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  coinsGroup.setLifetimeEach(-1);
  
  if(touches.length>0 || keyDown("SPACE")) {      
    touches = []
  }

  textSize(40)
  fill("red")
  text("GAME OVER",400,250)
}

drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.y = Math.round(random(500,250))
    obstacle.x = Math.round(random(200,350))
    obstacle.setCollider('circle',0,0,45)
  
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(stoneImg);
              break;
      case 2: obstacle.addImage(prisonImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    obstacle.depth = girl.depth;
    girl.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins() {
  if(frameCount % 60 === 0) {
    var coins = createSprite(600,height-95,20,30);
    coins.addImage(coinImg)
    coins.y = Math.round(random(500,250))
    coins.x = Math.round(random(100,450))
    coins.setCollider('circle',0,0,45)

    //assign scale and lifetime to the obstacle           
    coins.scale = 0.5;
    coins.lifetime = 100;
    coins.depth = girl.depth;
    girl.depth +=1;
    //add each obstacle to the group
    coinsGroup.add(coins);
  }
}

