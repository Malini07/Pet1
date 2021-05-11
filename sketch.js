//Create variables here
var dog,dogImg,happyDogImg
var database
var foodS,foodStock;

function preload(){
dogImg = loadImage("dogImg.png")
happyDogImg = loadImage("dogImg1.png")
}

function setup() {

  database = firebase.database()

  createCanvas(500, 500);
  dog = createSprite(250,300,50,50)
  dog.addImage("dog",dogImg)
  dog.scale = 0.2;

  foodStock = database.ref("food");
  foodStock.on("value",readStock,showError);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage("dog",happyDogImg)
  }

  drawSprites();
  fill("white")
  text("Note: Press Up Arrow to feed DRAGO milk",140,100)
  textSize(20)
 
  stroke(2)

  text("FOOD REMAINING:"+foodS,140,200);


}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}
function showError(){
  console.log("someError")
}

