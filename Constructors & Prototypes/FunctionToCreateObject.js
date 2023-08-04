/*
var Student1={
    name:"raj",
    rollno:57,
    marks:80,
};

var Student2={
    name:"anu",
    rollno:53,
    marks:85,
};


console.log(Student1);
console.log(Student2);
*/

function Student(name,rollno,marks){

    var student=new Object();
    student.name=name;
    student.rollno=rollno;
    student.marks=marks;

    return student;
}


var student1=Student('raj',57,80);
var student2=Student('anu',53,85);

console.log(student1);
console.log(student2);