"use strict";

let data = { price: 5, quantity: 2 };

Object.defineProperty(data, "price", {
  get() {
    console.log(`I was accessed`);
  },

  set(newVal) {
    console.log(`I was changed`);
  },
});

data.price;
data.price = 20;
