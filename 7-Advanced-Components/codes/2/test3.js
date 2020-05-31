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
let target = null;

function watcher(myFunc) {
  target = myFunc;
  dep.depend();
  target();
  target = null;
}

watcher(() => {
  total = price * quantity;
});

console.log(total); // 10
price = 20;
console.log(total); // 10
dep.notify();
console.log(total); // 40
