"use strict";

let data = { price: 5, quantity: 2 };
let internalValue = data.price;

Object.defineProperty(data, "price", {
  get() {
    console.log(`Getting price: ${internalValue}`);
    return internalValue;
  },

  set(newVal) {
    console.log(`Setting price to: ${newVal}`);
    internalValue = newVal;
  },
});

console.log(`internalValue before change: ${internalValue}`);
data.price;
data.price = 20;
console.log(`internalValue after change: ${internalValue}`);
