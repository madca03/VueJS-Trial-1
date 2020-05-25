"use strict";

let data = { price: 5, quantity: 2 };
let target, total, salePrice;

class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },

    set(newVal) {
      internalValue = newVal;
      dep.notify();
    },
  });
});

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  total = data.price * data.quantity;
});

watcher(() => {
  salePrice = data.price * 0.9;
});

// console.log(total); // 10
// console.log(salePrice); // 4.5
// data.price = 20;
// console.log(total); // 40
// console.log(salePrice); // 18
// data.quantity = 10;
// console.log(total); // 200
