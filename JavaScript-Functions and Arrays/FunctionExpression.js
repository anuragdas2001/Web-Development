// function fact(){

//     var ans=1;

//     for(var i=1;i<=5;i++)
//     {
//         ans*=i;
//     }
//     return ans;

// }

var factorial1=function fact(N){

    var ans=1;

    for(var i=1;i<=N;i++)
    {
        ans*=i;
    }
    
    return ans;

};
var factorial2=function (N){

    var ans=1;

    for(var i=1;i<=N;i++)
    {
        ans*=i;
    }
    
    return ans;

};

console.log(factorial1);
console.log(factorial2);
console.log(factorial1(5));
console.log(factorial2(5));