let genBtn = document.querySelector(".container p");
let result = document.querySelector(".result span");
let lengthPass = document.getElementById("length");
let upperEl = document.getElementById("uppercase");
let lowerEl = document.getElementById("lowercase");
let numberEl = document.getElementById("number");
let symbolEl = document.getElementById("symbol");
let clibBoard = document.querySelector(".clib");

// set clibboard function
clibBoard.addEventListener("click", copyPassword);
function copyPassword() {
  let textArea = document.createElement("textarea");
  textArea.innerText = result.innerText;
  let password = textArea.value;

  if (!password) {
    return "";
  }
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password Copied");
}

// set max length value of input and min length
let setMax = lengthPass.setAttribute("max", "20");
let setMin = lengthPass.setAttribute("min", "4");
// get max length value and min length
let getMax = lengthPass.getAttribute("max");
let getMin = lengthPass.getAttribute("min");
let randomFunc = {
  lower: randomLower,
  upper: randomUpper,
  number: randomNumber,
  symbol: randomSymbol,
};

genBtn.addEventListener("click", () => {
  let length = +lengthPass.value,
    hasLower = lowerEl.checked,
    hasUpper = upperEl.checked,
    hasNumber = numberEl.checked,
    hasSymbol = symbolEl.checked;

  result.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let final = "";

  let typeCount = lower + upper + number + symbol;

  let arrType = [{ lower }, { upper }, { number }, { symbol }].filter(
    (x) => Object.values(x)[0]
  );
  if (typeCount == 0) {
    return "";
  }
  if (length <= getMax && length >= getMin) {
    for (let i = 0; i < length; i++) {
      arrType.forEach((item) => {
        let obDetails = Object.keys(item)[0];
        final += randomFunc[obDetails]();
      });
    }
    return final.slice(0, length);
  }
  return "";
}

function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function randomSymbol() {
  let symbol = "!@#%^&*()=<>?.{}/[]-";
  return symbol[Math.floor(Math.random() * symbol.length)];
}
