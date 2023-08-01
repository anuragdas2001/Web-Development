function Person(name){
    this.name=name;
    console.log(this);

    setTimeout(function(){
        console.log(this);
    },1000);
}

var p=new Person("Anurag");