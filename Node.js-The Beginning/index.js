console.log('Hello World');

function add(a,b){
    return a+b;
}


console.log(add(5,5));


console.log(process.argv);

var args=process.argv.slice(2);
console.log(args);
console.log(add(parseInt(args[0]),parseInt(args[1])));

