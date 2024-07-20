<template>
  <div class="top-bar">
    <img src="@/assets/logo.png" alt="PetShop Logo" />
    <div class="brand-logo">petson.</div>
    <div class="nav-links">
      <router-link to="/">PRODUCTS</router-link>
      <router-link to="/promotions">PROMOTIONS</router-link>
      <router-link to="/blog">BLOG</router-link>
      <router-link to="/cart">CART (0)</router-link>
      <button v-if="!user" @click="openLoginModal">LOGIN</button>
      <div v-else class="user-info">
        <img :src="avatarUrl" class="avatar" @click="openUserSettingsModal" />
        <button @click="logout">LOGOUT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  computed: {
    avatarUrl() {
      return this.user && this.user.avatar
        ? this.user.avatar
        : "@/assets/placeholder.png";
    },
  },
  methods: {
    openLoginModal() {
      this.$emit("openLoginModal");
    },
    logout() {
      this.$emit("logout");
      this.$router.push("/");
    },
    openUserSettingsModal() {
      this.$emit("openUserSettings");
    },
  },
};
</script>

<style scoped>
.top-bar {
  background-color: #4ec690;
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
  border: white 1px solid;
  border-radius: 5px;
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
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
