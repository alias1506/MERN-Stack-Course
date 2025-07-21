let roll = document.getElementById("roll");
let phase = document.getElementById("phase");

let num = 0;
roll.addEventListener("click", () => {
  num = Math.floor(Math.random() * 6) + 1;
  phase.innerHTML = '<img src="assets/images/' + num + '.png">';
});
