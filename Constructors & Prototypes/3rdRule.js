//Implicit Binding
var raj={
    name:'Raj',
    greet:function(){
        console.log('Hello',this);
    }
};

// raj.greet();

var localAsk=raj.greet;

console.log(localAsk);
console.log(localAsk());


console.log(localAsk.bind(raj)());