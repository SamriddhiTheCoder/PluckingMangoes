const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var boyImg, treeImg, bgImg;

function preload(){
	boyImg = loadImage("images/boy.png");
	treeImg = loadImage("images/tree.png");
	bgImg = loadImage("images/bg.jpg");
}

function setup(){
	createCanvas(1000, 600);

	engine = Engine.create();
	world = engine.world;

	ground = new Ground(500, 590, 1000, 25);

	mango1 = new Mango(750, 100, 50);
	mango2 = new Mango(650, 300, 60);
	mango3 = new Mango(650, 210, 50);
	mango4 = new Mango(880, 200, 60);
	mango5 = new Mango(740, 200, 50);
	mango6 = new Mango(780, 280, 60);

	stone = new Stone(60, 430, 30);

	sling = new Launcher(stone.body, {x:60, y:430});

	Engine.run(engine); 
}

function draw() {
  background(bgImg);
  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);

  image(treeImg, 750, 330, 450, 600);
  image(boyImg, 120, 510, 200, 290);
  
  ground.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();

  stone.display();

  sling.display();

  detectCollision(stone, mango1);
  detectCollision(stone, mango2);
  detectCollision(stone, mango3);
  detectCollision(stone, mango4);
  detectCollision(stone, mango5);
  detectCollision(stone, mango6);
}

function mouseDragged(){
    Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
    sling.fly();
}

function keyPressed(){
    if(keyCode === 32){
       Matter.Body.setPosition(stone.body, {x: 50 , y: 50});
       sling.attach(stone.body);
	}
}

function detectCollision(lstone, lmango){
	mangoBodyPosition = lmango.body.position;
	stoneBodyPosition = lstone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
	if(distance <= lmango.r + lstone.r){
		Matter.Body.setStatic(lmango.body, false);
	}
}