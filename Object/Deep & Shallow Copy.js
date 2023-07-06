const a=4;
const b=a;
let c=a;

c=10;

console.log(a);//deep copy


//shallow copy
var susan={
    name:"Susan",
    age:30,
}

var raj=susan;

console.log(raj);
// raj.name="Raj";
console.log(raj);
console.log(susan);

//how to do deep copy in arrays and objects
var raj={...susan};
raj.name="Raj";
console.log(raj);
console.log(susan);

//Another way to do a deep copy
var virat=Object.assign({},susan);
virat.name="Virat";
console.log(virat);
console.log(susan);
 

//For arrays 

var arr1=[1,2,3,4];
var arr2=arr1;
arr2.push(20);
console.log(arr1);
console.log(arr2);

//For making a deep copy of an array 

var vec1=[1,2,3,4];
var vec2=Object.assign([],vec1);
vec2.push(20);
console.log(vec1);
console.log(vec2);



//another way

var vec3=[...vec1];
vec3.push(12);
console.log(vec3);
console.log(vec1);


//another way
var vec5=vec1.map(el=>el);//returns a brand new array
vec5.push(15);
console.log(vec1);
console.log(vec5);
