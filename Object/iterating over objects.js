var student={
    name: "abc", 
    rollNo:134, 
    marks:90,
};

// var keys=Object.keys(student);
// console.log(keys);
// var vals=Object.values(student);
// console.log(vals);

var Keys2=Object.getOwnPropertyNames(student);
console.log(Keys2);
var Keys3=Object.keys(student);
console.log(Keys3);

// for(var prop in student)
// {
//     console.log(prop,student[prop]);
// }