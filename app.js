const input = document.querySelector("#screen");
const clear = document.querySelector("#clear");
const show = document.querySelectorAll(".show");
const result = document.querySelector(".equal");
const backspace = document.querySelector(".back");

let parens = /\(([0-9+\-*/\^ .]+)\)/; // Regex for identifying parenthetical expressions
let mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
let div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
let add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
let sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)

for (item of show) {
  item.addEventListener("click", (e) => {
    btntext = e.target.innerText;
    if (btntext == "÷") {
      btntext = "/";
    }

    if (btntext == "×") {
      btntext = "*";
    }
    input.value += btntext;
  });
}

backspace.addEventListener("click", function () {});

result.addEventListener("click", function () {
  //   console.log(input.value);
  let ans = evaluate(input.value);
  input.value = ans;
});

function evaluate(expr) {
  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      let newExpr = expr.replace(parens, function (match, subExpr) {
        return evaluate(subExpr);
      });
      return evaluate(newExpr);
    } else if (mul.test(expr)) {
      let newExpr = expr.replace(mul, function (match, a, b) {
        return Number(a) * Number(b);
      });
      return evaluate(newExpr);
    } else if (div.test(expr)) {
      let newExpr = expr.replace(div, function (match, a, b) {
        if (b != 0) return Number(a) / Number(b);
        else throw new Error("Division by zero");
      });
      return evaluate(newExpr);
    } else if (add.test(expr)) {
      let newExpr = expr.replace(add, function (match, a, b) {
        return Number(a) + Number(b);
      });
      return evaluate(newExpr);
    } else if (sub.test(expr)) {
      let newExpr = expr.replace(sub, function (match, a, b) {
        return Number(a) - Number(b);
      });
      return evaluate(newExpr);
    } else {
      return expr;
    }
  }
  return Number(expr);
}

// clear input area
clear.addEventListener("click", () => {
  input.value = " ";
});
