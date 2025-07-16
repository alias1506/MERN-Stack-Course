let heading = document.getElementById("heading");
let btn = document.getElementById("btn");
let username = document.getElementById("username");
let greeting = document.getElementById("greeting");

function changeHeading() {
  heading.innerHTML = "DOM Manipulation";
}

function greet() {
  if (username.value == "") {
    greeting.innerHTML = "Please enter your name";
  } else {
    // greeting.innerHTML = "Hello " + username.value;
    greeting.innerHTML = `Hello ${username.value}`;
  }
}
