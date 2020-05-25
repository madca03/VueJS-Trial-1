"using strict";

let price = 5;
let quantity = 2;
let total = 0;
let target = null;
let storage = [];

target = () => {
  total = price * quantity;
};

function record() {
  storage.push(target);
}
function replay() {
  storage.forEach((run) => run());
}

record();
target();

console.log(total); // 10
price = 20;
console.log(total); // 10
replay();
console.log(total); // 40
