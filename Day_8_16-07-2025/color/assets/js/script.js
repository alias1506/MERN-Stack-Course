let body = document.getElementById("body-bg");
let title = document.getElementById("title");
let titleChange = document.getElementById("title-change");
let reset = document.getElementById("reset");

function colorx(color) {
  if (color === "reset") {
    title.style.display = "block";
    titleChange.style.display = "none";
    titleChange.innerHTML = "";
    body.style.backgroundColor = "";
    reset.style.backgroundColor = "#000";
    reset.style.color = "#fff";
  } else {
    title.style.display = "none";
    titleChange.style.display = "block";
    titleChange.innerHTML = "Background color set to " + color;
    body.style.backgroundColor = color;
    reset.style.backgroundColor = "#fff";
    reset.style.color = "#000";
  }
}
