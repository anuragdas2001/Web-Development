class Vehicle{
    constructor(numWheels,price){
        this.numWheels=numWheels;
        this.price=price;

    }
    getPrice(){
        return this.price;
    }

}
class car extends Vehicle{
    constructor(price,numDoors){
        super(4,price);         //calls parent class constructor
        this.numDoors=numDoors;
    }
}


var c=new car(400000,4);
console.log(c);
console.log(c.getPrice());
var v1=new Vehicle(2,40000);
var v2=new Vehicle(4,400000);


// console.log(v1.getPrice());
// console.log(v2.getPrice());
