 
 var promise=new Promise((resolve,reject)=>{

    // Promise();
    setTimeout(() => {
        resolve({message:'Success'});
    }, 5000);
 });
 
 var rejection=new Promise((resolve,reject)=>{
    reject("Failed");
 });

//  console.log(promise);
 
// called whenever promise is fullfiled
promise.then((data)=>{
    console.log("Data:",data);
})
rejection.catch((error)=>{
    console.log('error',error);
});


//  console.log(reject);