// var scrollInterval=setTimeout(function(){
//     window.scrollBy(0,1700);
// },1000);

// clearInterval(scrollInterval);

var skill = document.getElementById("skill");
var targetpos = 900;
var currentpos = 0;
var scrollInterval;
function scrollskills() {
  if (currentpos >= targetpos) {
    clearInterval(scrollInterval);
    return;
  }
  currentpos += 100;
  window.scrollBy(0, 100);
}

skill.addEventListener("click", function () {
  scrollInterval = setInterval(scrollskills, 20);
});

var skillsContainer = document.querySelector(".skills-display");
var progressBars = document.querySelectorAll(".skills-progress > div");
window.addEventListener("click", checkScroll);
var animationDone = false;

function initialiseBars() {
  for (let bar of progressBars) {
    bar.style.width = 0 + "%";
  }
}
initialiseBars();

function fillBars() {
  for (let bar of progressBars) {
    let targetWidth = bar.getAttribute("data-bar-width");
    let currentWidth = 0;
    let interval = setInterval(function () {
      if (currentWidth >= targetWidth) {
        clearInterval(interval);
        return;
      }
      currentWidth++;
      bar.style.width = currentWidth + "%";
    }, 5);
  }
}

function checkScroll() {
  //You have to check weather still container is visible
  var coordinates = skillsContainer.getBoundingClientRect();

  if (!animationDone && coordinates.top <= window.innerHeight) {
    animationDone = true;
    console.log("Skills Section Visible");
    fillBars();
  } else if (coordinates.top > window.innerHeight) {
    animationDone = false;
    initialiseBars();
  }
}

window.addEventListener("scroll", checkScroll);
