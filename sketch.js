var PLAY = 1;
var SERVE = 0;
var END = 2
var gameState = SERVE;
var bird, topPipes, bottomPipes, topPipesGroup, bottomPipesGroup, sprite, birdImage, resetImage, smashSound, resetSound, score;

function preload() {
  birdImage = loadImage("bird.png");
  resetImage = loadImage("reset.png");
  smashSound = loadSound("smash.mp3");
  resetSound = loadSound("reset.mp3");
}

function setup() {
  createCanvas(400,400)
  
  sprite = createSprite(23,23,10,10);
  sprite.addImage(resetImage);
  sprite.scale = 0.07;
  bird = createSprite(200,200,10,10);
  bird.addImage(birdImage);
  bird.scale = 0.15;
  bird.setCollider("rectangle",0,0,240,240);
  topPipesGroup = createGroup();
  bottomPipesGroup = createGroup();
  score = 0;
}

function draw() {
  background("lightblue");
  
    if(gameState===SERVE) {
      score = 0;
      textFont("georgia");
      fill("black");
      text("Press the space key to start",10,20);
      sprite.visible = false;
       if(keyDown("space")) {
        gameState = PLAY;
    }
}
  
    if(gameState===PLAY) {
      sprite.visible = false;
      if(keyDown("space")) {
        bird.velocityY = -4;
       }
      
      bird.velocityY = bird.velocityY+0.5;
    
 if(bird.isTouching(topPipesGroup)||bird.isTouching(bottomPipesGroup)||bird.y>400||bird.y<0) {
        gameState=END;
        smashSound.play();
  }
      
      if(frameCount%50 === 0) {
      score++;
      }
      
      textFont("georgia");
      fill("black");
      textSize(20);
      text("Score: " + score,300,20);
      
      spawn_topPipes();
      spawn_bottomPipes();
}
  
  else if(gameState===END) {
    bird.velocityY = 0;
    topPipesGroup.setVelocityEach(0,0);
    bottomPipesGroup.setVelocityEach(0,0);
    sprite.visible = true;
    if(mousePressedOver(sprite)) {
      reset();
      resetSound.play();
    }
  }
  
  drawSprites();
}

function spawn_topPipes() {
    if(frameCount%50 === 0) {
      topPipes = createSprite(400,10,20,random(100,350));
      topPipes.velocityX = -5;
      rand = Math.round(random(1,6));
      if (rand === 1) {
      topPipes.shapeColor = "red";
      } else if (rand === 2) {
        topPipes.shapeColor = "orange";
      } else if (rand === 3) {
        topPipes.shapeColor = "yellow";
      } else if (rand === 4) {
        topPipes.shapeColor = "green";
      } else if (rand === 5) {
        topPipes.shapeColor = "blue";
      } else if (rand === 6) {
        topPipes.shapeColor = "purple";
      }
      topPipesGroup.add(topPipes);
    } 
}

function spawn_bottomPipes() {
    if(frameCount%50 === 0) {
      bottomPipes = createSprite(400,390,20,random(100,350));
      bottomPipes.velocityX = -5;
      rand = Math.round(random(1,6));
      if (rand === 1) {
      bottomPipes.shapeColor = "red";
      } else if (rand === 2) {
        bottomPipes.shapeColor = "orange";
      } else if (rand === 3) {
        bottomPipes.shapeColor = "yellow";
      } else if (rand === 4) {
        bottomPipes.shapeColor = "green";
      } else if (rand === 5) {
        bottomPipes.shapeColor = "blue";
      } else if (rand === 6) {
        bottomPipes.shapeColor = "purple";
      }
      bottomPipesGroup.add(bottomPipes);
    }
}

function reset() {
  gameState=SERVE;
  topPipesGroup.destroyEach();
  bottomPipesGroup.destroyEach();
  bird.y = 200;
  bird.x = 200;
}