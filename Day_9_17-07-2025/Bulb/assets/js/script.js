function switchBulb(action) {
  if (action == "on") {
    document.getElementById("bulb").src = "assets/image/turned.png";
  } else {
    document.getElementById("bulb").src = "assets/image/turned-off.png";
  }
}
