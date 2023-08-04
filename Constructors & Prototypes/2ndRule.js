//Explicit Binding
const john={
    name:'John',
};
const Anu={
    name:'Anu',
};
function ask(){
    console.log(this,this.name);
}

ask.call(john);//calls ask function 
// console.log(john.name);
// or,
ask.apply(Anu);

//Hard Binding

var raj={
    name:'raj',
    greet:function(){
        console.log('Hello',this.name);
       
    }
}

// raj.greet();

// var localAsk=raj.greet;

// localAsk();

var localGreet=raj.greet.bind(raj);

console.log(localGreet());

// setTimeout(raj.greet.bind(raj),1000);

// console.log(raj.greet.bind(raj)());
