var Veh=class Vehicle{
    constructor(numWheels,price){
        this.numWheels=numWheels;
        this.price=price;

    }
    getPrice(){
        return this.price;
    }

}

var v1=new Veh(2,40000);
var v2=new Veh(4,400000);


console.log(v1.getPrice());
console.log(v2.getPrice());
console.log(Veh);

// Hoisting in classes doesn't take place but in functions it does