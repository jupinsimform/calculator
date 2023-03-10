const input = document.querySelector("#screen");
const clear = document.querySelector("#clear");
const show = document.querySelectorAll(".show");
const result = document.querySelector(".equal");
const backspace = document.querySelector(".back");
const fact = document.querySelector(".fact");
const memory_store = document.querySelector("#mem_store");
const memory_clear = document.querySelector("#mem_clear");
const memory_plus = document.querySelector("#mem_plus");
const memory_minus = document.querySelector("#mem_minus");
const memory_recall = document.querySelector("#mem_recall");

let parens = /\(([0-9+\-*/\^ .]+)\)/; // Regex for identifying parenthetical expressions
let mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
let div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
let add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
let sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)
let mode = /(\d+(?:\.\d+)?) ?% ?(\d+(?:\.\d+)?)/; // Regex for identifying modulo (x % y)
let squr = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying modulo (x % y)

for (item of show) {
  item.addEventListener("click", (e) => {
    btntext = e.target.innerText;
    if (btntext == "÷") {
      btntext = "/";
    }

    if (btntext == "×") {
      btntext = "*";
    }
    if (btntext == "π") {
      btntext = "3.14159";
    }
    if (btntext == "e") {
      btntext = "2.71828";
    }
    if (btntext == "xy") {
      btntext = "^";
    }
    input.value += btntext;
  });
}

memory_store.addEventListener("click", function () {
  let int = parseInt(input.value);
  let arr;
  if (localStorage.getItem("arr") === null) {
    arr = " ";
  } else {
    arr = JSON.parse(localStorage.getItem("arr"));
  }
  //   arr.push(int);
  localStorage.setItem("arr", JSON.stringify(int));
  input.value = "";
});

memory_plus.addEventListener("click", function () {
  let int = parseInt(input.value);
  int = int + parseInt(localStorage.getItem("arr"));

  localStorage.setItem("arr", JSON.stringify(int));

  input.value = int.toString();
});

memory_minus.addEventListener("click", function () {
  let int = parseInt(input.value);
  int = int - parseInt(localStorage.getItem("arr"));

  localStorage.setItem("arr", JSON.stringify(int));

  input.value = int.toString();
});

memory_recall.addEventListener("click", function () {
  input.value = localStorage.getItem("arr").toString();
});

memory_clear.addEventListener("click", function () {
  localStorage.clear();
  input.value = " ";
});

function restTo2() {
  let int = parseInt(input.value);
  input.value = Math.pow(int, 2).toString();
}

function by_x() {
  let int = 1 / parseInt(input.value);
  input.value = int.toString();
}

function absolute() {
  let int = parseInt(input.value);
  input.value = Math.abs(int).toString();
}

function exponential() {
  let int = parseInt(input.value);
  input.value = Math.pow(2.718281828459, int).toString();
}

function squr_root() {
  let int = parseInt(input.value);
  input.value = Math.sqrt(int).toString();
}

function ten_x() {
  let int = parseInt(input.value);
  input.value = Math.pow(10, int).toString();
}

function log() {
  let int = parseInt(input.value);
  input.value = Math.log10(int).toString();
}

function ln() {
  let int = parseInt(input.value);
  input.value = Math.log(int).toString();
}

fact.addEventListener("click", function () {
  let int = parseInt(input.value);
  if (int == 0 || int == 1) {
    int = 1;
  } else {
    for (var i = int - 1; i >= 1; i--) {
      int *= i;
    }
  }
  input.value = int.toString();
});

backspace.addEventListener("click", function () {
  let temp = input.value;
  temp = temp.slice(0, temp.length - 1);
  input.value = temp;
});

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
    } else if (mode.test(expr)) {
      let newExpr = expr.replace(mode, function (match, a, b) {
        return Number(a) % Number(b);
      });
      return evaluate(newExpr);
    } else if (squr.test(expr)) {
      let newExpr = expr.replace(squr, function (match, a, b) {
        return Math.pow(Number(a), Number(b));
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
