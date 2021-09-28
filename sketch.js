var path,steve,iron,diamonds,gold,tnt;
var pathImg,steveImg,ironImg,diamondsImg,goldImg,tntImg;
var inventory = 0;
var ironG,diamondsG,goldG,tntGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("sand.jpg");
  steveImg = loadImage("steve.gif");
  ironImg = loadImage("iron.png");
  diamondsImg = loadImage("diamond.png");
  goldImg = loadImage("gold.png");
  tntImg = loadImage("tnt.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//create a canvas
 createCanvas(windowWidth,windowHeight);

// Moving background

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale = 10;


//creating steve running
steve = createSprite(width/2,height-20,20,20);
steve.addAnimation("steveRunning",steveImg);
steve.scale=0.5;
  
  
ironG=new Group();
diamondsG=new Group();
goldG=new Group();
tntGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  steve.x = World.mouseX;
  
  edges= createEdgeSprites();
  steve.collide(edges);

   if(path.y > height ){
     path.y = height/2;
   }
  
    createiron();
    createDiamonds();
    creategold();
    createtnt();

    if (ironG.isTouching(steve)) {
      ironG.destroyEach();
      inventory=inventory + 50;
    }
    else if (diamondsG.isTouching(steve)) {
      diamondsG.destroyEach();
      inventory=inventory + 100;
      
    }else if(goldG.isTouching(steve)) {
      goldG.destroyEach();
      inventory= inventory + 150;
      
    }else{
      if(tntGroup.isTouching(steve)) {
        gameState=END;
        
        steve.addAnimation("steveRunning",endImg);
        steve.x=width/2;
        steve.y=height/2;
        steve.scale=0.6;
        
        ironG.destroyEach();
        diamondsG.destroyEach();
        goldG.destroyEach();
        tntGroup.destroyEach();
        
        ironG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        goldG.setVelocityYEach(0);
        tntGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(18);
  fill(255);
  text("Valuable Items: "+ inventory,width-150,30);
  }

}

function createiron() {
  if (World.frameCount % 200 == 0) {
  var iron = createSprite(Math.round(random(50, width-50),40, 10, 10));
  iron.addImage(ironImg);
  iron.scale=1;
  iron.velocityY = 5;
  iron.lifetime = 200;
  ironG.add(iron);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=1;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function creategold() {
  if (World.frameCount % 410 == 0) {
  var gold = createSprite(Math.round(random(50, width-50),40, 10, 10));
  gold.addImage(goldImg);
  gold.scale=1;
  gold.velocityY = 5;
  gold.lifetime = 200;
  goldG.add(gold);
  }
}

function createtnt(){
  if (World.frameCount % 530 == 0) {
  var tnt = createSprite(Math.round(random(50, width-50),40, 10, 10));
  tnt.addImage(tntImg);
  tnt.scale=1;
  tnt.velocityY = 4;
  tnt.lifetime = 200;
  tntGroup.add(tnt);

  }
} 
