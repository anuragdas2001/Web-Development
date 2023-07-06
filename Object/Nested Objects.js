var student = {
  name: "abc",
  rollNo: 134,
  marks: 90,
  address: {
    city: "Kolkata",
    pincode: "700055",
  }
};

// console.log(student.address);
// console.log(student.address.city);
// console.log(student.address["pincode"]);

for (var prop in student.address) {
  console.log(prop,student.address[prop]);
}
