var sec=1;
function sayHello(){
    console.log("Hello",sec);
    sec++;
    if(sec==6)
    {
        clearInterval(id);
    }
}

// setTimeout(sayHello,10000);
var id =setInterval(sayHello,1000);
console.log(id);
