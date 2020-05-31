"use strict";

let data = { price: 5, quantity: 2 };
Object.keys(data).forEach((key) => {   // Get the keys and iterate through them
  let internalValue = data[key]; // Set initial value

  Object.defineProperty(data, key, {
    get() {
      console.log(`Getting ${key}: ${internalValue}`);
      return internalValue;
    },

    set(newVal) {
      console.log(`Setting ${key} to: ${newVal}`);
      internalValue = newVal;
    },
  });
});

let total = data.price * data.quantity
data.price = 20