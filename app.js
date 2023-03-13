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
let tan = /tan(\d+)/;
let sin = /sin(\d+)/;
let cos = /cos(\d+)/;
let arcTan = /arcTan(.)*(\d+)/;
let arcSin = /arcSin(.)*(\d+)/;
let arcCos = /arcCos(.)*(\d+)/;

for (item of show) {
  item.addEventListener("click", (e) => {
    btntext = e.target.innerText;
    if (btntext == "÷") {
      btntext = "/";
    }
    if (btntext == "×") {
      console.log(btntext);
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
    if (btntext == "tan-1") {
      btntext = "arcTan";
    }
    if (btntext == "sin-1") {
      btntext = "arcSin";
    }
    if (btntext == "cos-1") {
      btntext = "arcCos";
    }
    input.value += btntext;
  });
}

memory_store.addEventListener("click", function () {
  let int = Number(input.value);
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
  let int = Number(input.value);
  int = int + Number(localStorage.getItem("arr"));

  localStorage.setItem("arr", JSON.stringify(int));

  input.value = int.toString();
});

memory_minus.addEventListener("click", function () {
  let int = Number(input.value);
  int = int - Number(localStorage.getItem("arr"));

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

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("shown");
}
function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("shown");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("shown")) {
        openDropdown.classList.remove("shown");
      }
    }
  }
};

function degToRad() {
  let unit = document.getElementById("toggle").innerHTML;
  if (unit == "DEG") {
    input.value =
      ((Number(input.value) * 180) / Math.PI).toFixed(2).toString() + "°";
    document.getElementById("toggle").innerHTML = "RAD";
  } else if (unit == "RAD") {
    // console.log(input.value);
    input.value = ((Number(input.value.slice(0, -1)) * Math.PI) / 180)
      .toFixed(2)
      .toString();
    document.getElementById("toggle").innerHTML = "DEG";
  }
}

function featureToggle() {
  let unit = document.getElementById("otherFun").innerText;
  // console.log(unit);
  if (unit == "2nd") {
    document.getElementById("restTo3").style.display = "block";
    document.getElementById("cuberoot").style.display = "block";
    document.getElementById("y-squrroot-x").style.display = "block";
    document.getElementById("twox").style.display = "block";
    document.getElementById("xbasey").style.display = "block";
    document.getElementById("exponential").style.display = "block";

    document.getElementById("restTo2").style.display = "none";
    document.getElementById("squrroot").style.display = "none";
    document.getElementById("x-restTo-y").style.display = "none";
    document.getElementById("tenx").style.display = "none";
    document.getElementById("log").style.display = "none";
    document.getElementById("ln").style.display = "none";

    document.getElementById("otherFun").innerHTML =
      "<span>1<sup>st</sup></span>";
  } else if (unit == "1st") {
    document.getElementById("restTo3").style.display = "none";
    document.getElementById("cuberoot").style.display = "none";
    document.getElementById("y-squrroot-x").style.display = "none";
    document.getElementById("twox").style.display = "none";
    document.getElementById("xbasey").style.display = "none";
    document.getElementById("exponential").style.display = "none";

    document.getElementById("restTo2").style.display = "block";
    document.getElementById("squrroot").style.display = "block";
    document.getElementById("x-restTo-y").style.display = "block";
    document.getElementById("tenx").style.display = "block";
    document.getElementById("log").style.display = "block";
    document.getElementById("ln").style.display = "block";

    document.getElementById("otherFun").innerHTML =
      "<span>2<sup>nd</sup></span>";
  }
}

function floor() {
  input.value = Math.floor(Number(input.value)).toString();
}

function ceil() {
  input.value = Math.ceil(Number(input.value)).toString();
}

function restTo_2() {
  let int = parseInt(input.value);
  input.value = Math.pow(Number(input.value), 2).toString();
}

function by_x() {
  input.value = 1 / Number(input.value).toString();
}

function absolute() {
  input.value = Math.abs(Number(input.value)).toString();
}

function exponential() {
  input.value = Math.pow(2.718281828459, Number(input.value)).toString();
}

function squr_root() {
  input.value = Math.sqrt(Number(input.value)).toString();
}

function ten_x() {
  input.value = Math.pow(10, Number(input.value)).toString();
}

function log() {
  input.value = Math.log10(Number(input.value)).toString();
}

function ln() {
  input.value = Math.log(Number(input.value)).toString();
}

fact.addEventListener("click", function () {
  let int = Number(input.value);
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
    } else if (div.test(expr)) {
      let newExpr = expr.replace(div, function (match, a, b) {
        if (b != 0) return Number(a) / Number(b);
        else throw new Error("Division by zero");
      });
      return evaluate(newExpr);
    } else if (mul.test(expr)) {
      let newExpr = expr.replace(mul, function (match, a, b) {
        return Number(a) * Number(b);
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
    } else if (tan.test(expr)) {
      let ans = Math.tan((Number(expr.slice(3)) * Math.PI) / 180);
      // console.log(ans);
      return evaluate(ans.toFixed(3).toString());
    } else if (sin.test(expr)) {
      let ans = Math.sin((Number(expr.slice(3)) * Math.PI) / 180);
      return evaluate(ans.toFixed(3).toString());
    } else if (cos.test(expr)) {
      let ans = Math.cos((Number(expr.slice(3)) * Math.PI) / 180);
      return evaluate(ans.toFixed(3).toString());
    } else if (arcTan.test(expr)) {
      console.log(expr);
      let ans = (Math.atan(Number(expr.slice(6))) * 180) / Math.PI;
      console.log(ans);
      return evaluate(ans.toFixed(2).toString() + "°");
    } else if (arcSin.test(expr)) {
      let ans = (Math.asin(Number(expr.slice(6))) * 180) / Math.PI;
      console.log(typeof ans);
      return evaluate(ans.toFixed(2).toString() + "°");
    } else if (arcCos.test(expr)) {
      let ans = (Math.acos(Number(expr.slice(6))) * 180) / Math.PI;
      console.log(typeof ans);
      return evaluate(ans.toFixed(2).toString() + "°");
    } else {
      return expr;
    }
  }
  return Number(expr);
}

// clear input area
clear.addEventListener("click", () => {
  input.value = "";
});
