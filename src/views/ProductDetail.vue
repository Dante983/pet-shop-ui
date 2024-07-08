<template>
  <div class="product-detail">
    <div class="breadcrumb">
      <router-link to="/">Home</router-link> /
      <span>{{ product.category }}</span> / <span>{{ product.name }}</span>
    </div>
    <div class="product-main">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <h2>{{ product.brand }}</h2>
        <h3>{{ product.category }}</h3>
        <p class="product-price">{{ product.price }} kn</p>
        <div class="quantity-selector">
          <button @click="decreaseQuantity">-</button>
          <input type="number" v-model="quantity" min="1" />
          <button @click="increaseQuantity">+</button>
        </div>
        <button class="add-to-cart" @click="addToCart">Add to Cart</button>
      </div>
    </div>
    <div class="product-description">
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
    <div class="product-composition">
      <h4>Composition</h4>
      <p>{{ product.composition }}</p>
    </div>
    <div class="product-ingredients">
      <h4>Analytical Ingredients</h4>
      <p>{{ product.ingredients }}</p>
    </div>
    <div class="product-nutritional">
      <h4>Nutritional Composition</h4>
      <p>{{ product.nutritional }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  methods: {
    async fetchProduct() {
      const uuid = this.$route.params.uuid;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_ROOT_API}/api/v1/products/${uuid}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    addToCart() {
      // Logic to add the product to the cart
      alert("Added to cart");
    },
  },
  created() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.product-main {
  display: flex;
  justify-content: space-between;
}

.product-image {
  max-width: 40%;
  height: auto;
}

.product-info {
  max-width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.product-price {
  font-size: 24px;
  margin: 20px 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.quantity-selector button {
  background-color: #4ec690;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.quantity-selector input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.add-to-cart {
  background-color: #4ec690;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.product-description,
.product-composition,
.product-ingredients,
.product-nutritional {
  margin: 40px 0;
}
</style>
