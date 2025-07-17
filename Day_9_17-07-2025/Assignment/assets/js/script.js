function changeEmoji(element) {
  document.getElementById("emoji").innerHTML =
    '<img src="' + element.src + '" alt="emoji" />';
}

function changeBackground(element) {
  document.getElementById("background").innerHTML =
    '<img src="' + element.src + '" alt="background" />';
}

function reset(action) {
  if (action === "emoji") {
    document.getElementById("emoji").innerHTML = "";
  } else {
    document.getElementById("background").innerHTML = "";
  }
}
