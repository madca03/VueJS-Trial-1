// Observer design patter?

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

const dep = new Dep();

let price = 5;
let quantity = 2;
let total = 0;

let target = () => {
  total = price * quantity;
};

dep.depend();
target();

// console.log(price); // 5
// console.log(total); // 10
// price = 20;
// console.log(total); // 10
// dep.notify(); // run the target again
// console.log(total); // 40

// to run in node cli
// $ node
// > .load test2.js
// > price
// 5
// > total
// 10
// > price = 20
// 20
// > total
// 10
// > dep.notify()
// undefined
// > total
// 40
