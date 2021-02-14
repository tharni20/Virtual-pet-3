var gameState;
var database;
var dog;
var foodS;
var Milk;
var LastFed;
var FedTime;
var playingDog;
var currenttime;
var sleepingDog;
var washroomDog;


function preload(){
    dogimg=loadImage("aDog.png");
    happydogimg=loadImage("happydog.png");
    playingDogimg=loadImage("Playing.jpg");
    sleepingDogimg=loadImage("sleepying.png");
    washroomDogimg=loadImage("washroom.jpg");

}

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    dog = createSprite (300,300,30,40);
    dog.addImage(dogimg);
    dog.scale = 0.2

    addfoodbutton = createButton ("Add Food");
    addfoodbutton.position(600,150);
    addfoodbutton.mousePressed(addFood);

    feedfoodbutton = createButton ("Feed Food");
    feedfoodbutton.position(400,150);
    feedfoodbutton.mousePressed(feedFood);
    
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    Milk=new Food();
    
    readState=database.ref('gameState');
    readState.on("value",function(data){
    gameState=data.val();
});

}

function draw(){
    background("grey");


   currenttime=hour()
   console.log(currenttime)
   if (currenttime == (LastFed+1)){
   update("playing");
   Milk.playing()
   } else if(currenttime == (LastFed+2)){
       update("sleeping");
       Milk.sleeping();
   }
  
      else if ((currenttime>LastFed+2) && currenttime<=(LastFed+4)){
      update("washroom");
      Milk.washroom();
   }
   else{
       update("hungry");
       Milk.display();
   }
    
    FedTime = database.ref("FeedTime");
    FedTime.on ("value", function (data){
        LastFed = data.val();
    })

    drawSprites();
 
 if(gameState!="hungry"){
    feedfoodbutton.hide();
    addfoodbutton.hide();
    dog.remove();
}else{
    feedfoodbutton.show();
    addfoodbutton.show();
    dog.addImage(dogimg);
}

}


function readStock(data){
    foodS=data.val();
}

function writeStock(x){

    if(x<=0){
        x=0;
    }else{
        x=x-1
    }

database.ref('/').update({
    Food:x
})
}

function feedFood(){
    dog.addImage(happydogimg);
    foodS=foodS-1
    database.ref('/').update({
        FeedTime:hour(),
        Food:foodS
    })
}

function addFood(){
    foodS=foodS+1
    database.ref('/').update({
        Food:foodS
    })
}


function update(state){
    database.ref('/').update({
        gameState:state
    });
}