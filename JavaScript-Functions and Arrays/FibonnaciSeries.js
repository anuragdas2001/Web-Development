// Write your code here:

function Fib(N)
{
var a=0;
var b=1;

	if(a===N || b===N)
        return true;
	
	var tmp=a+b;
	while(tmp<=N)
        {
           
            a=b;
            b=tmp;
            tmp=a+b;

            if(tmp===N)
            return true;
            
        }




	return false;

}

console.log(Fib(10));