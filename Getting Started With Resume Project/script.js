// var scrollInterval=setTimeout(function(){
//     window.scrollBy(0,1700);
// },1000);

// clearInterval(scrollInterval);

var skill=document.getElementById("skill");
var targetpos=900;
var currentpos=0;
var scrollInterval;
function scrollskills(){
  if(currentpos>=targetpos){
    clearInterval(scrollInterval);
    return;
  }
  currentpos+=100;
  window.scrollBy(0,100);
}

skill.addEventListener("click",function(){
  scrollInterval=setInterval(scrollskills,20);
});