class Vehicle{
    constructor(numWheels,price){
        this.numWheels=numWheels;
        this.price=price;

    }
    getPrice(){
        return this.price;
    }

}

var v1=new Vehicle(2,40000);
var v2=new Vehicle(4,400000);


console.log(v1.getPrice());
console.log(v2.getPrice());
