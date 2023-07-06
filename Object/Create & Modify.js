// Write your code here:
var student = {
  name: "Anurag",
  rollno: 53,
  marks: 90,
  address: {
    city: "Kolkata",
    State: "West Bengal",
  },
};

for (var prop in student) {
  console.log(prop, student[prop]);
}
// console.log(student.name);

delete student.rollno;

for (var prop in student) {
  console.log(prop, student[prop]);
}

console.log(student["address"]["city"]);