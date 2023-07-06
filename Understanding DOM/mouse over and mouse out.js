var outerDiv=document.getElementById('outer');

function MouseOver(){
    console.log("Mouse Over");
}
function MouseOut(){
    console.log("Mouse Out");
}
function Search(){
    console.log("KeyPress");
}
outerDiv.addEventListener('mouseover',MouseOver);
outerDiv.addEventListener('mouseout',MouseOut);

var searchInput=document.getElementById('search');
searchInput.addEventListener('keypress',Search);


document.addEventListener('keydown',function(event)
{
    console.log('Key down',event.keyCode);
});