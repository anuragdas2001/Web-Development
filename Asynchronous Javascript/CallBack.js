function greet(name,callback){
    console.log(`Hi ${name}`);
    setTimeout(callback,2000);
}





function askQuestion(){
    console.log("How Are You ?");

}

greet('Anurag',askQuestion);