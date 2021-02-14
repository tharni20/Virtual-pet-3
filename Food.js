class Food {
    constructor(){
        this.image=loadImage("Milk.png");
    }

    display(){
    image (this.image,20,200,30,30)

    fill("red");
    text ("food:"+foodS,200,30);
    if(LastFed>=12){
        text("Last Feed : "+ LastFed%12+"PM", 350,30);
    }else if (LastFed==0){
        text("Last Feed : 12 AM",350,30);
    }else{
        text("Last Fed : "+ LastFed + "AM", 350, 30);
 }
 }

 playing(){
     background(playingDogimg,250,250);
 }

 sleeping(){
     background(sleepingDogimg,250,250);
 }
 washroom(){
     background(washroomDogimg,250,250);
 }
 

    
}
