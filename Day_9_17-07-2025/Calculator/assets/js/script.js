let input = document.getElementById("screen");
let decimal = document.getElementById("decimal");
let result = 0;

function calcfunc(action) {
  switch (action) {
    case "ac":
      document.getElementById("screen").value = "";
      decimal.disabled = false;
      break;

    case "c":
      let val = input.value;
      let newVal = val.slice(0, -1);
      val = newVal;
      input.value = val;
      if (!getLastNumber(input.value).includes(".")) {
        decimal.disabled = false;
      }
      break;

    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case "00":
      input.value += action;
      break;

    case ".":
      if (!getLastNumber(input.value).includes(".")) {
        input.value += ".";
        decimal.disabled = true;
      }
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      input.value += action;
      if (!getLastNumber(input.value).includes(".")) {
        decimal.disabled = false;
      }
      break;

    case "%":
      input.value = input.value / 100;
      if (!getLastNumber(input.value).includes(".")) {
        decimal.disabled = false;
      }
      break;

    case "=":
      input.value = eval(input.value);
      if (!getLastNumber(input.value).includes(".")) {
        decimal.disabled = false;
      }
      break;

    default:
      break;
  }
}

function getLastNumber(expression) {
  const parts = expression.split(/[\+\-\*\/]/);
  return parts[parts.length - 1];
}
