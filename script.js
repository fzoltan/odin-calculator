function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    if(num2 != 0)
        return num1 / num2;
    else
        return "Error";
}

function operate (num1, num2, operator) {
    switch(operator) {
        case "+":
            return Math.round(add(num1, num2) * 10000) / 10000;
            break;
        case "-":
            return Math.round(subtract(num1, num2) * 10000) / 10000;
            break;
        case "x":
            return Math.round(multiply(num1, num2) * 10000) / 10000;
            break;
        case "/":
            return Math.round(divide(num1, num2) * 10000) / 10000;
            break;
    }
}

let expression = "";
let currentExpression = "";
let num1 = 0;
let num2 = 0;
let op = "";

const buttons = document.querySelectorAll("button");
const exp = document.querySelector(".expression");
const currExp = document.querySelector(".current-expression");

exp.innerHTML = "";
currExp.innerHTML = "0";

function refreshDisplay(){
    exp.innerHTML = expression;
    currExp.innerHTML = currentExpression;
}

function alterDisplayValue(e) {
    if(e.target.id === "clear") {
        expression = "";
        currentExpression = "0";
        num1 = 0;
        num2 = 0;
        op = "";
        refreshDisplay();
    }
    else if(e.target.id === "delete") {
        if(currentExpression != "0")
            currentExpression = currentExpression.slice(0,-1);
        if(currentExpression === "")
            currentExpression = "0";
        refreshDisplay();
    }
    else if(e.target.id === "+" || e.target.id === "-" || e.target.id === "/" || e.target.id === "x") {
        if(op === "") {
            op = e.target.id;
            expression = `${currentExpression} ${op}`;
            refreshDisplay();
            num1 = Number(currentExpression);
            currentExpression = "0";
        }
        else {
            num2 = Number(currentExpression);
            currentExpression = operate(num1, num2, op);
            op = e.target.id;
            expression += ` ${num2} =`; 
            expression = `${currentExpression} ${op}`;
            refreshDisplay();
            num1 = currentExpression;
            currentExpression = "";
            num2 = 0;
        }
    }
    else if(e.target.id === "=") {
        num2 = Number(currentExpression);
        currentExpression = operate(num1, num2, op);
        expression += ` ${num2} =`; 
        num1 = num2;
        num2 = 0;
        op = "";
        refreshDisplay();

    }
    else {
        if(currentExpression === "0") {
            currentExpression = `${e.target.id}`;
        }
        else {
            currentExpression += `${e.target.id}`;
        }
        refreshDisplay();
    }

}

buttons.forEach(button => button.addEventListener("click", alterDisplayValue));