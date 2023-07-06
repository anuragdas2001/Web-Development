var buttons = document.getElementsByClassName("button");
var dis = document.getElementById("display");
var op1 = 0;
var op2 = null;
var operator = null;
function ShowNumber(value) {
  dis.textContent += value;
}
function handleOp(value) {
  operator = value;
  op1 = parseFloat(dis.textContent);
  dis.innerText = "";
}
function performOp() {
  if (operator === "+") {
    op2 = parseFloat(dis.textContent);
    var res = op1 + op2;
    dis.innerText = res;
  }
  if (operator === "-") {
    op2 = parseFloat(dis.textContent);
    var res = op1 - op2;
    dis.innerText = res;
  }
  if (operator === "*") {
    op2 = parseFloat(dis.textContent);
    var res = op1 * op2;
    dis.innerText = res;
  }
  if (operator === "/") {
    op2 = parseFloat(dis.textContent);
    var res = op1 / op2;
    dis.innerText = res;
  }
}
function clearDisplay() {
  dis.innerText = "";
  op1 = 0;
  op2 = null;
  operator = null;
}
function Show() {
  var value = this.getAttribute("data-value");

  if (value === "=") {
    performOp();
  } else if (value === "+" || value === "-" || value === "*" || value === "/") {
    handleOp(value);
  } else if (value === "AC") {
    clearDisplay();
  } else {
    ShowNumber(value);
  }
}


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", Show);
}
