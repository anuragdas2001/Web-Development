function getData(){
    return Promise.resolve("Success!");
}

async function abc(){
    const data=await getData();

    console.log(data);
}

abc();
console.log('1');
