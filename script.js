function operate(oper, firstNum, secondNum) {
  if (oper == "add") {
    return firstNum + secondNum;
  } else if (oper == "subtract") {
    return firstNum - secondNum;
  } else if (oper == "divide") {
    return firstNum / secondNum;
  } else if (oper == "multiply") {
    return firstNum * secondNum;
  }
}

let firstNumber = 0;
let operation = "";
let secondNumber = 0;

function populateDisplay(num) {
  const selectResults = document.querySelector('.result');
  selectResults.innerHTML = selectResults.innerHTML + num;
  let checkNumberLength = num.toString().length;
  if(checkNumberLength > 7) {
    selectResults.innerHTML = num.toFixed(6)
  }
}

function getFirstNumber() {
  const selectResults = document.querySelector('.result');
  let getfirstNumber = selectResults.textContent;
  firstNumber = parseFloat(getfirstNumber.slice(0, -1));
}

function getSecondNumber(operator) {
  operator = operation;
  const selectResults = document.querySelector('.result');
  let getSecondNumber = selectResults.textContent;
  let indexOfOperator = getSecondNumber.indexOf(operator);
  secondNumber = parseFloat(getSecondNumber.substring(indexOfOperator + 1));
}

function doCalculation(operation) {
  if (operation == "-") {
    populateDisplay(operate("subtract", firstNumber, secondNumber));
  } else if (operation == "+") {
    populateDisplay(operate("add", firstNumber, secondNumber));
  } else if (operation == "/") {
    populateDisplay(operate("divide", firstNumber, secondNumber));
  } else if (operation == "*") {
    populateDisplay(operate("multiply", firstNumber, secondNumber));
  }

}

function clearDisplay() {
  const selectResults = document.querySelector('.result');
  selectResults.innerHTML = "";
}

function backspace() {
  const selectResults = document.querySelector('.result');
  const resultsValue = selectResults.textContent;
  const newValue = resultsValue.slice(0, -1);
  clearDisplay();
  populateDisplay(newValue);
}

function checkOperationCount(operator) {
  const selectResults = document.querySelector('.result');
  const resultsValue = selectResults.textContent;
  let operatorsArray = ["-", "+", "/", "*"];
  for (let i = 0; i < operatorsArray.length; i++) {
    if (resultsValue.includes(operatorsArray[i])) {
      getSecondNumber();
      if (secondNumber !== 0) {
        clearDisplay();
        doCalculation(operatorsArray[i]);
      } else {
        clearDisplay();
        populateDisplay("NO WAY");
        firstNumber = 0;
        secondNumber = 0;
      }
    }
  }
  if (resultsValue.includes(".")) {
    console.log("d");
  }
}

function plusOperator(oper) {
  checkOperationCount("+");
  populateDisplay(oper);
  operation = "+";
  getFirstNumber();
}
function minusOperator(oper) {
  checkOperationCount("-");
  populateDisplay(oper);
  operation = "-";
  getFirstNumber();
}
function divideOperator(oper) {
  checkOperationCount("/");
  populateDisplay(oper);
  operation = "/";
  getFirstNumber();
}
function multiplyOperator(oper) {
  checkOperationCount("*");
  populateDisplay(oper);
  operation = "*";
  getFirstNumber();
}

function equalsOperator() {
  getSecondNumber();
  clearDisplay();
  if (secondNumber == 0) {
    populateDisplay("NO WAY");
  } else {
    doCalculation(operation);
  }
}

function dotButton() {
  
}

document.querySelectorAll(".btn").forEach(button => button.addEventListener("click", function (btn) {
  //backspace function 
  if (button.classList.contains("backspace")) {
    backspace();
  } else if (button.classList.contains("clear")) { // screen clear function
    clearDisplay();
  } else if (button.classList.contains("minus")) {
    minusOperator(button.textContent);
  } else if (button.classList.contains("plus")) {
    plusOperator(button.textContent);
  } else if (button.classList.contains("divide")) {
    divideOperator(button.textContent);
  } else if (button.classList.contains("multiply")) {
    multiplyOperator(button.textContent);
  } else if (button.classList.contains("dot")) {
    document.getElementById("dot").disabled = true;
    populateDisplay(button.textContent);
    getFirstNumber();
  } else if (button.classList.contains("equals")) {
    equalsOperator();
  } else if (button.classList.contains("num")) {
    populateDisplay(button.textContent);
  }
}));



document.addEventListener("keydown", function(event) {
  if(isFinite(event.key)) {
    populateDisplay(event.key);
    console.log(event);
  } else if (event.key == "+") {
    plusOperator(event.key);
  } else if (event.key == "-") {
    minusOperator(event.key);
  } else if (event.key == "/") {
    divideOperator(event.key);
  } else if (event.key == "*") {
    multiplyOperator(event.key);
  } else if (event.key == "c") {
    clearDisplay();
  } else if (event.key == "Backspace") {
    backspace();
  } else if (event.key == "Enter") {
    equalsOperator();
  }

});