x = 5;
y = "5";
console.log(x == y);
console.log(x === y);

x == y ? console.log("true") : console.log("false");

// implicit conversion
x = "5";
y = 5;
console.log(x + y);

// explicit conversion
x = "5";
y = 5;
console.log(parseInt(x) + y);

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = arr1 + "," + arr2;
console.log(arr3);
// spread sperator
let arr4 = [...arr1, ...arr2];
console.log(arr4);

let user1 = {
  name: "John",
  rest: {
    age: 30,
    state: "NY",
  },
};
console.log(user1.name);
console.log(user1.rest);
console.log(user1.rest.age);
console.log(user1.rest.state);
