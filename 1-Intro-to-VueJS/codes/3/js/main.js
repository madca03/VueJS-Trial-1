"use strict";

const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./assets/vmSocks-green.jpg",
    altText: "socks",
    inventory: 11,
    inStock: false,
    onSale: true,
  },
});
