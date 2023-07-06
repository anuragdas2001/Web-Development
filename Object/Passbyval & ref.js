function f(a,b,c)
{
    a=20;
    b.push("Babai");
    c.first=true;
}
var x=10;
var y=["Anurag","Das"];
var z={first:false};

f(x,y,z);
console.log(x,y,z);


//20
//Anurag Das Babai
//false : true