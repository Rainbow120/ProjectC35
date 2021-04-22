//Create variables here
var dog, happyDog;
var foodS, foodStock, fS;
var database;

function preload(){
	dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(400,250);
  dog.addImage(dogImg1);
  dog.scale = 0.225;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  fS = 20;
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
    fS = fS-1;
    if(fS<=0){
      fS = 0;
    }
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Food Left: "+ fS,350,50)
  textSize(15);
  fill("yellow")
  text("Note: Press Up Arrow to feed Drago milk!", 50,250)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
