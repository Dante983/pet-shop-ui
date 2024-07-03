<template>
  <div class="top-bar">
    <div class="brand-logo">PetShop!</div>
    <div class="nav-links">
      <router-link to="/products">Products</router-link>
      <router-link to="/promotions">Promotions</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/cart">Cart (0)</router-link>
      <button @click="$emit('show-login-modal')">Login</button>
    </div>
  </div>
</template>

<script>
console.log("TopBar");
export default {
  name: "TopBar",
};
</script>

<style scoped>
.top-bar {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.brand-logo {
  font-size: 24px;
}
.nav-links {
  display: flex;
  align-items: center;
}
.nav-links a,
.nav-links button {
  color: white;
  text-decoration: none;
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-links a:hover,
.nav-links button:hover {
  text-decoration: underline;
}
</style>
