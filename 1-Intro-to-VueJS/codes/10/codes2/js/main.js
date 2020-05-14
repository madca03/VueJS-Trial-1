"use strict";

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" v-model="recommend" value="yes"/>
        </label>
        <label>
          No
          <input type="radio" v-model="recommend" value="no"/>
        </label>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,

  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },

  methods: {
    onSubmit() {
      this.errors = [];

      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend === "yes" ? true : false,
        };

        this.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    },
  },
});

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

      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>

      <product-review @review-submitted="addReview"></product-review>
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
      reviews: [],
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
    addReview(productReview) {
      this.reviews.push(productReview);
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
