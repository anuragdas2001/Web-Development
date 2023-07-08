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
  if(value==="√"){
    dis.innerText+="√";
    op1 = parseFloat(dis.textContent);

  }
  else{
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
  if(value==="∏"){
    op1=3.1415926535897;
    dis.innerText=op1;
  }
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
  if(operator==="√"){
    op1 = parseFloat(dis.textContent.substring(1)); // Remove the square root symbol
    var res = Math.sqrt(op1);
    dis.innerText = "√" + op1 + " = " + res;
  }
  if(operator==="^"){
    op2 = parseFloat(dis.textContent);
    var res=Math.pow(op1,op2);
    dis.innerText=op1 + "^" + op2 + "=" + res;
  }
  
}

// function SquareRoot(value) {
//   operator = value;
//   var input = dis.textContent;
//   op1 = parseFloat(input);

//   if (isNaN(op1)) {
//     dis.textContent = "Invalid Input";
//   } else if (op1 < 0) {
//     dis.textContent = "√" + input + " = NaN";
//   } else {
//     dis.textContent = "√" + input + " = " + Math.sqrt(op1);
//   }
// }



function backOp(){
  var res=dis.textContent;
  res=res.slice(0,-1);
  dis.textContent=res;

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
  else if(value==="backspace"){
    backOp();
  }
  else if (value === "=") {
    performOp();
  } else if (value === "+" || value === "-" || value === "*" || value === "/" || value==="%") {
    handleOp(value);
  } else if (value === "AC") {
    clearDisplay();
  } 
  else if(value==="√"){
    handleOp(value);
  }
  else if(value==="^"){
    handleOp(value);
  }
  else if(value==="∏"){
    handleOp(value);
  }
  else {
    ShowNumber(value);
  }
}


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", Show);
}