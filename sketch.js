var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed,addFood, fedTime;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
   
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);
}

// function to display UI
function draw() {
  background("yellow");
  foodObj.display();
  fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    });
  fill(255,255,254);
  textSize(15);
    if(lastFed>=12){
      text("Last Feed :"+ lastFed%12+ "PM",150,30);
    }
    else if(lastFed==0){
      text("Last Feed :"+ 12+ "AM",350,30);
    }
    else{
      text("Last Feed :"+ lastFed+ "AM",350,30);
    }

  drawSprites();
  
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(dogImg1);

    if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);

    }
    else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
    database.ref('/').update({
       Food:foodObj.getFoodStock(),
       FeedTime:hour()
    });
}
function addFoods(){
    foodS++;
    datebase.ref('/').update({
      Food:foodS
    });
  }

