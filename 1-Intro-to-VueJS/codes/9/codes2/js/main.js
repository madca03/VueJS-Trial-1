"use strict";

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}

        <product-details :details="details"></product-details>

        <div class="color-box" 
            v-for="(variant, index) in variants" 
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <button @click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
          Add to Cart
        </button>

        <button @click="removeFromCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
          Remove from Cart
        </button>

      </div>
    </div>
  `,

  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      altText: "socks",
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green.jpg",
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue.jpg",
          variantQuantity: 20,
        },
      ],
    };
  },

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
  },

  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },

  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      let index = this.cart.indexOf(id, 0);
      if (index === -1) return;
      this.cart.splice(index, 1);
    },
  },
});
