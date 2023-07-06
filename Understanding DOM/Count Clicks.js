"use strict";


var box = document.getElementById('box');
var counterElement = document.getElementById('counter');
var cnt = 0;
function Show() {
  cnt++;
  counterElement.textContent ='Box Clicked : ' + cnt;
}
box.addEventListener('click', Show);
