var heading=document.getElementById('one');
// console.log(heading);
heading.style.color='red';
heading.style.backgroundColor='cyan';
var headings=document.getElementsByTagName('h1');
headings[0].innerText="First Heading";
headings[1].innerText="Second Heading ";
var para=document.getElementsByClassName("para");
para[0].innerText="This is First PARA";
para[0].style.backgroundColor="orange";

///Query Selector

var heading1=document.querySelector('#one');
heading1.style.backgroundColor="yellow";
var heading2=document.querySelector('#two');
heading2.style.backgroundColor='beige';

var para1=document.querySelector('.para');
para1.style.backgroundColor="green";