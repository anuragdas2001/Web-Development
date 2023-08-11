var promise=new Promise(function(resolve,reject){
    resolve('Resolved');
});

promise.then((data)=>{
    console.log(data);
})

promise.then((data)=>console.log(data));

Promise.resolve('Resolved').then((data)=>console.log(data));

Promise.reject('Failed').catch((data)=>console.log(data));

async function AsynTask(){
    return "Resolved";
}

AsynTask().then(data=>console.log(data));