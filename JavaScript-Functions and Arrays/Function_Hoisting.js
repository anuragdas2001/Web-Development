function hoistDemo(){
    console.log(i);
    var i=10; //variable hoisting
}
//similar to the above
function hoistDemo(){
    var i; //declaration is moved up
    console.log(i);
    i=10; //variable hoisting
}

hoistDemo();

h();
function h(){
   var i=10;
   console.log(i);
}
x=5;
console.log(x);

console.log(null === undefined);
console.log(typeof( typeof( typeof( 100 ) ) ));
var a;
if( typeof(a) ) {
    console.log("true")
}
else {
    console.log("false")
}
