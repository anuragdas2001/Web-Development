// Smooth scroll hint 1 is present in Getting Started with Resume
var sec=document.getElementById("section");
var coordinates=section.getBoundingClientRect();
sec.addEventListener("click",function(event){
    //prevents the default behaviour that will take place
    //prevents the default scrolling behaviour of the anchor tag
        event.preventDefault();
})