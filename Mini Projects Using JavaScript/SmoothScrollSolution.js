var navMenuAnchorTags = document.querySelector(".nav-menu a");

for (var i = 0; i < navMenuAnchorTags.length; i++) {
  navMenuAnchorTags[i].addEventListener("click", function (event) {
    event.preventDefault();

    var targetSectionID = this.textContent.trim().toLowerCase();
    console.log(targetSectionID);
    var targetSection = document.getElementById(targetSectionID);
    console.log(targetSection);
    var interval = setInterval(function () {
      var targetSectionCoordinates = targetSection.getBoundingClientRect();

      if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
      }
      window.scrollBy(0, 50);
    }, 50);
  });
}
