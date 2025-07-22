let password = document.getElementById("password");
let strength = document.getElementById("strength");
let eyeIcon = document.getElementById("eye-icon");

password.addEventListener("input", () => {
  let value = password.value;
  let count = 0;
  // check length
  if (value.length < 8) {
    document.getElementById("len").src = "assets/images/cross.png";
  } else {
    document.getElementById("len").src = "assets/images/tick.png";
    count++;
  }
  // check number
  if (value.match(/[0-9]/)) {
    document.getElementById("num").src = "assets/images/tick.png";
    count++;
  } else {
    document.getElementById("num").src = "assets/images/cross.png";
  }
  // check special character
  if (value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
    document.getElementById("spe-char").src = "assets/images/tick.png";
    count++;
  } else {
    document.getElementById("spe-char").src = "assets/images/cross.png";
  }
  // check uppercase
  if (value.match(/[A-Z]/)) {
    document.getElementById("up").src = "assets/images/tick.png";
    count++;
  } else {
    document.getElementById("up").src = "assets/images/cross.png";
  }
  // check lowercase
  if (value.match(/[a-z]/)) {
    document.getElementById("low").src = "assets/images/tick.png";
    count++;
  } else {
    document.getElementById("low").src = "assets/images/cross.png";
  }

  // check strength
  if (count <= 2) {
    strength.innerHTML = "Weak";
    strength.classList.add("weak");
  } else if (count <= 4) {
    strength.innerHTML = "Good";
    strength.classList.add("good");
  } else {
    strength.innerHTML = "Strong";
    strength.classList.add("strong");
  }
});

// show and hide password
eyeIcon.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    eyeIcon.src = "assets/images/eye-open.png";
  } else {
    password.type = "password";
    eyeIcon.src = "assets/images/eye-close.png";
  }
});
