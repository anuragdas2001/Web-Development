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


// console.log(vehicle1.getPrice());
// console.log(vehicle2.getPrice());


console.log(Object.getPrototypeOf(vehicle1));

console.log(vehicle1.__proto__);
console.log(vehicle1.__proto__ === Vehicle.prototype);

console.log(Vehicle.prototype.isPrototypeOf(vehicle1));

console.log(vehicle1.hasOwnProperty('price'));
console.log(vehicle1.hasOwnProperty('getPrice'));

Vehicle.prototype.color="Black";

console.log(vehicle1.color);


vehicle2.color="Red";

console.log(vehicle2.color);