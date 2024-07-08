<template>
  <div class="home">
    <div class="banner">
      <!-- <img src="@/assets/banner.jpg" alt="Banner" /> -->
    </div>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search products"
        v-model="searchQuery"
        @input="filterProducts"
      />
    </div>
    <section v-if="filteredProducts.length" class="product-section">
      <h2>Dry dog food</h2>
      <div class="product-carousel">
        <button class="carousel-nav left" @click="prevProduct">&#10094;</button>
        <div
          v-for="product in filteredProducts"
          :key="product.uuid"
          class="product-card"
          @click="goToProductDetail(product.uuid)"
        >
          <img :src="product.image" :alt="product.title" />
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>{{ product.brand }}</p>
            <p>{{ product.price }} kn</p>
          </div>
        </div>
        <button class="carousel-nav right" @click="nextProduct">
          &#10095;
        </button>
      </div>
    </section>
    <section class="promotion-section">
      <!-- <img src="@/assets/promotion.jpg" alt="Promotion" /> -->
      <div class="promotion-info">
        <h2>Treat your pup</h2>
        <button>Discover our dog treat selection</button>
      </div>
    </section>
    <section v-if="filteredProducts.length" class="product-section">
      <h2>Pet treats and chews</h2>
      <div class="product-carousel">
        <button class="carousel-nav left" @click="prevProduct">&#10094;</button>
        <div
          v-for="product in filteredProducts"
          :key="product.uuid"
          class="product-card"
          @click="goToProductDetail(product.uuid)"
        >
          <img :src="product.image" :alt="product.title" />
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>{{ product.brand }}</p>
            <p>{{ product.price }} kn</p>
          </div>
        </div>
        <button class="carousel-nav right" @click="nextProduct">
          &#10095;
        </button>
      </div>
    </section>
    <section class="blog-section">
      <!-- <img src="@/assets/blog.jpg" alt="Blog" /> -->
      <div class="blog-info">
        <h2>Get the best tips</h2>
        <button>Read our blog</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      products: [],
      searchQuery: "",
      filteredProducts: [],
      carouselIndex: 0,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_ROOT_API}/api/v1/products`
        );
        this.products = response.data;
        this.filteredProducts = this.products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    filterProducts() {
      if (this.searchQuery) {
        this.filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredProducts = this.products;
      }
    },
    prevProduct() {
      if (this.carouselIndex > 0) {
        this.carouselIndex--;
      }
    },
    nextProduct() {
      if (this.carouselIndex < this.filteredProducts.length - 1) {
        this.carouselIndex++;
      }
    },
    goToProductDetail(uuid) {
      this.$router.push(`/products/${uuid}`);
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

.banner img {
  width: 100%;
  height: auto;
}

.search-bar {
  margin: 20px 0;
}

.search-bar input {
  padding: 10px;
  width: 80%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.product-section {
  margin: 40px 0;
}

.product-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  gap: 20px;
  padding: 20px;
  position: relative;
}

.product-card {
  min-width: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  flex-shrink: 0;
  transition: transform 0.5s;
  cursor: pointer;
}

.product-card img {
  width: 100%;
  height: auto;
}

.product-info {
  padding: 10px;
}

.carousel-nav {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.carousel-nav.left {
  left: 10px;
}

.carousel-nav.right {
  right: 10px;
}

.promotion-section,
.blog-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
  padding: 20px;
  background: #f9f9f9;
}

.promotion-section img,
.blog-section img {
  width: 50%;
  height: auto;
}

.promotion-info,
.blog-info {
  text-align: left;
  max-width: 500px;
}

.promotion-info h2,
.blog-info h2 {
  margin-bottom: 20px;
}

.promotion-info button,
.blog-info button {
  padding: 10px 20px;
  background: #4ec690;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
