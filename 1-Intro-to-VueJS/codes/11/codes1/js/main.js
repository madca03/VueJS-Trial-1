"use strict";

const eventBus = new Vue();

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

        eventBus.$emit("review-submitted", productReview);
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

        <details-shipping-tabs :premium="premium" :details="details"></details-shipping-tabs>

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

      <product-tabs :reviews="reviews"></product-tabs>

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
  },

  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
  },
});

Vue.component("details-shipping-tabs", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    details: {
      type: Array,
      require: true,
    },
  },

  template: `
    <div>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab">
            {{ tab }}
      </span>

      <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>
      <product-details v-show="selectedTab === 'Details'" 
                      :details="details">
      </product-details>
    </div>
  `,

  data() {
    return {
      tabs: ["Details", "Shipping"],
      selectedTab: "Details",
    };
  },

  computed: {
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab }" 
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab">
            {{ tab }}
      </span>

      <div v-show="selectedTab === 'Reviews'">
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

      <product-review v-show="selectedTab === 'Make a Review'">
      </product-review>
    </div>
  `,

  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
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
