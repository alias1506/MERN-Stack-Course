let input = document.getElementById("screen");
let decimal = document.getElementById("decimal");
let result = 0;

function calcfunc(action) {
  if (action == "ac") {
    document.getElementById("screen").value = "";
    decimal.disabled = false;
  } else if (action == "c") {
    let val = input.value;
    let newVal = val.slice(0, -1);
    val = newVal;
    input.value = val;
  } else if (
    action == "1" ||
    action == "1" ||
    action == "2" ||
    action == "3" ||
    action == "4" ||
    action == "5" ||
    action == "6" ||
    action == "7" ||
    action == "8" ||
    action == "9" ||
    action == "0" ||
    action == "00"
  ) {
    input.value += action;
  } else if (action == ".") {
    input.value += action;
    decimal.disabled = true;
  }
}
