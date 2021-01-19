const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
 
var engine, world;
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var ground;
var score = 0;
var particles = [];
var particle;
var turn = 0;
var gameState = "start";
var line1;

function setup() {
    var canvas = createCanvas(480,800);
    engine = Engine.create();
    world = engine.world;
  
    ground = new Ground(240, 790, 480, 20);
    //line1 = new Ground(240, 480, width, 10);
  
    for(var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height - divisionHeight/2, 10, divisionHeight));
    }
    
    for(var j = 40; j <= width; j = j + 50){
      plinkos.push(new Plinko(j, 75));
      plinkos.push(new Plinko(j, 175));
      plinkos.push(new Plinko(j, 275));
      plinkos.push(new Plinko(j, 375));
    }

    mousePressed();
  }

function draw() {
  background("black");

  textSize(20);
  text("Score : " + score, 20, 30);
  text("100", 25, 700);
  text("50", 110, 700);
  text("25", 190, 700);
  text("20", 270, 700);
  text("25", 350, 700);
  text("80", 430, 700);

  Engine.update(engine);

  ground.display();

  if(gameState == "end") {
    textSize(20);
    text("Game Over. Your score is "+score, 130, 230);
  }

  for(var j = 0; j < plinkos.length; j ++){
    plinkos[j].display();
  }

  if(particle !== null) {
    particle.display();
    if(particle.body.position.y > 760) {
      if(particle.body.position.x < 80 && particle.body.position.x > 0){
        score = score + 100;
        particle = null;
      
      if(turn >= 5){
        gameState = "end";
      }
      }
      else if(particle.body.position.x < 160 && particle.body.position.x > 80){
        score = score + 50;
        particle = null;
      
      if(turn >= 5){
        gameState = "end";
      }
      }
      else if(particle.body.position.x < 240 && particle.body.position.x > 160){
        score = score + 25;
        particle = null;
      
      if(turn >= 5){
        gameState = "end";
      }
      }
      else if(particle.body.position.x < 320 && particle.body.position.x > 240){
        score = score + 20;
        particle = null;
      
      if(turn >= 5){
        gameState = "end";
      }
      }
      else if(particle.body.position.x < 400 && particle.body.position.x > 320){
        score = score + 80;
        particle = null;
      
      if(turn >= 5){
        gameState = "end";
      }
      } 
  }

  }

  for (var k = 0; k < divisions.length; k++) {  
    divisions[k].display();
  }

}

function mousePressed() {
  if(gameState !== "end") {
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
    console.log(particle);
  }
}