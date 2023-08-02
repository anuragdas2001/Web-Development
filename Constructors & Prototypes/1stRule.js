function Vehicle(){
    console.log(this);
}
new Vehicle();

function Student(name){
    this.name=name;
}

var s1=new Student("Raj");
var s2=new Student("Anurag");

console.log(s1.name);
console.log(s2.name);