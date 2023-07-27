var current = document.querySelector('.current');
var next = document.querySelector('.next');
var dateDisplay = document.getElementById('dateDisplay');
var counterValue = 0;
var currentDate = 1;

function startCounter() {
  var interval = setInterval(animate, 1000);
}

function animate() {
  next.classList.add('animate');
  setTimeout(function () {
    next.classList.remove('animate');

    counterValue = (counterValue + 1) % 10;
    current.textContent = counterValue;
    next.textContent = (counterValue + 1) % 10;

    if (counterValue === 0) {
      currentDate = (currentDate % 31) + 1;
      dateDisplay.textContent = currentDate;
    }
  }, 1000);
}
