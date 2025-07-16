const order = {
  id: "ORD123",
  customer: {
    name: "Jhon",
    address: {
      city: "Kolkata",
      pin: 700001,
    },
  },
};

// Destructuring
const {
  id,
  customer: {
    name,
    address: { city, pin },
  },
} = order;

console.log(id); // ORD123
console.log(name); // Jhon
console.log(city); // Kolkata
console.log(pin); // 700001

console.log();
console.log();
console.log();
console.log();
console.log();

const product = {
  name: "Gourab",
  price: 1000,
  discount(percent) {
    return product.price - (this.price * percent) / 100;
  },
};

console.log(product.discount(10));

console.log();
console.log();
console.log();
console.log();
console.log();

const book1 = {
  title: "The Alchemist",
  author: "Paulo Coelho",
  details: showDetails,
};

const book2 = {
  title: "The Jungle Book",
  author: "Rudyard Kipling",
  details: showDetails,
};

function showDetails() {
  return `${this.title} by ${this.author}`;
}

console.log(book1.details());
console.log(book2.details());

console.log();
console.log();
console.log();
console.log();
console.log();

const car1 = {
  brand: "Suzuki",
};
function startEngine() {
  return `${this.brand} Car`;
}

car1.start = startEngine;
console.log(car1.start());

console.log();
console.log();
console.log();
console.log();
console.log();

// symbol in js
const symb1 = Symbol("id1");
const symb2 = Symbol("id2");

console.log(symb1);
console.log(symb2);

console.log(typeof symb1);
console.log(typeof symb2);

console.log(symb1 === symb2);

console.log();
console.log();
console.log();
console.log();
console.log();

const ID = Symbol("id");
const user = {
  name: "Gourab",
  ID: 1001,
};
console.log(user);
console.log(user.ID);
console.log(user.name);

console.log();
console.log();
console.log();
console.log();
console.log();

const obj1 = {
  a: 1,
};
const obj2 = {
  b: 2,
};
const obj3 = {
  c: 3,
};

console.log({ ...obj1, ...obj2, ...obj3 });
const merged = Object.assign(obj1, obj2, obj3);
console.log(merged);

console.log();
console.log();
console.log();
console.log();
console.log();

const obj = {
  a: 1,
  b: 2,
  c: 3,
};
console.log(obj.hasOwnProperty("a"));
console.log(obj.hasOwnProperty("b"));
console.log(obj.hasOwnProperty("c"));
console.log(obj.hasOwnProperty("d"));
