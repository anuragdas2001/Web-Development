function Vehicle(numWheels,price){
    this.numWheels=numWheels;
    this.price=price;
    // this.getPrice=function(){
    //     return this.price;
    // }
}

Vehicle.prototype.getPrice=function(){
    return this.price;
}

var vehicle1=new Vehicle(2,50000);
var vehicle2=new Vehicle(4,500000);
var vehicle3=new Vehicle(4," ");


// console.log(vehicle1.getPrice());
// console.log(vehicle2.getPrice());  


// console.log(Vehicle.prototype);
// console.log(Vehicle.prototype.constructor);



console.log(vehicle1.getPrice());
console.log(vehicle2.getPrice());
console.log(vehicle3.getPrice());