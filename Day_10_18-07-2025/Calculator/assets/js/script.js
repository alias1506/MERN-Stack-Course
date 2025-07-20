let input = document.getElementById("screen");
let decimal = document.getElementById("decimal");

function calcfunc(action) {
  let val = input.value;
  let lastChar = val.slice(-1);
  const operators = ["+", "-", "*", "/"];

  switch (action) {
    case "ac":
      input.value = "";
      decimal.disabled = false;
      break;

    case "c":
      input.value = val.slice(0, -1);
      if (!getLastNumber(input.value).includes(".")) {
        decimal.disabled = false;
      }
      break;

    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "00":
      input.value += action;
      break;

    case ".":
      if (!getLastNumber(val).includes(".")) {
        input.value += ".";
        decimal.disabled = true;
      }
      break;

    case "+":
    case "-":
      // Allow + or - at the start
      if (val === "") {
        input.value = action;
      } else if (!operators.includes(lastChar)) {
        input.value += action;
        decimal.disabled = false;
      } else if (operators.includes(lastChar)) {
        // Replace last operator
        input.value = val.slice(0, -1) + action;
        decimal.disabled = false;
      }
      break;

    case "*":
    case "/":
      if (val !== "" && !operators.includes(lastChar)) {
        input.value += action;
        decimal.disabled = false;
      } else if (val !== "" && operators.includes(lastChar) && val.length > 1) {
        // Replace last operator (not if it's first char)
        input.value = val.slice(0, -1) + action;
        decimal.disabled = false;
      }
      break;

    case "%":
      if (val !== "") {
        try {
          input.value = eval(val) / 100;
          decimal.disabled = false;
        } catch (e) {
          input.value = "Error";
        }
      }
      break;

    case "=":
      if (val === "") return;

      // If last char is operator, remove it before evaluating
      if (operators.includes(lastChar)) {
        val = val.slice(0, -1);
      }

      try {
        const result = eval(val);
        input.value = result;
        if (!getLastNumber(result.toString()).includes(".")) {
          decimal.disabled = false;
        }
      } catch (e) {
        input.value = "Error";
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
