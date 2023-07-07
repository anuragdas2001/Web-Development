var buttons = document.getElementsByClassName("button");
var dis = document.getElementById("display");
var op1 = 0;
var op2 = null;
var operator = null;
function ShowNumber(value) {
  dis.textContent += value;
}
function FactOp(op1){
 
  if(op1===0 || op1===1)
  {
    return 1;
  }
  
  res=op1*FactOp(op1-1);

  return res;
}
function handleOp(value) {
  operator = value;
  op1 = parseFloat(dis.textContent);
  dis.innerText = "";
  if(value==="%")
  {
    var res=op1/100;
    dis.innerText=res;
  }
  if(value==="!"){
    var res=FactOp(op1);
    dis.innerText=res;
  }
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
  // if(operator==="!")
  // {
  //   op1=parseFloat(dis.textContent);
  //   var res=FactOp(op1);
  //   dis.innerText=res;
  // }
}
function clearDisplay() {
  dis.innerText = "";
  op1 = 0;
  op2 = null;
  operator = null;
}
function Show() {
  var value = this.getAttribute("data-value");

  if(value==="!"){
    handleOp(value);
  }
  else if (value === "=") {
    performOp();
  } else if (value === "+" || value === "-" || value === "*" || value === "/" || value==="%") {
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
