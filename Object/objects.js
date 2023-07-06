var student={
    name: "abc", 
    rollNo:134, 
    marks:90
};
console.log(student);
console.log(student.name);
console.log(student["name"]);

var ob={};
var obj=new Object();

function printProperty(obj,prop){
    console.log(obj[prop]);
}

printProperty(student,"marks");
delete student["marks"];
console.log(student);
