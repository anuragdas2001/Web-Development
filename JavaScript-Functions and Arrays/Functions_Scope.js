var s="global";
console.log(s);//global scope

function print() //local scope
{
    var name="function";
    console.log(name);
}

print();
console.log(s); //out of scope of function 

function multiply(a, b) {
    return a*b;
};

console.log(multiply);