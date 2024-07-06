<template>
  <div class="top-bar">
    <div class="brand-logo">
      <img src="@/assets/logo.png" alt="Logo" />
      petson.
    </div>
    <div class="nav-links">
      <router-link to="/products">Products</router-link>
      <router-link to="/promotions">Promotions</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="cart-button">CART (0)</router-link>
      <button class="login-button" @click="toggleLogin">LOGIN</button>
      <!-- <button class="signup-button" @click="toggleSignUp">SIGN UP</button> -->
    </div>
    <LoginModal v-if="showLogin" @close="toggleLogin" />
    <SignUpModal
      v-if="showSignUp"
      @close="toggleSignUp"
      @switchToLogin="switchToLogin"
    />
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import SignUpModal from "@/components/SignUpModal.vue";

export default {
  name: "TopBar",
  components: { LoginModal, SignUpModal },
  data() {
    return {
      showLogin: false,
      showSignUp: false,
    };
  },
  methods: {
    toggleLogin() {
      this.showLogin = !this.showLogin;
      this.showSignUp = false;
    },
    toggleSignUp() {
      this.showSignUp = !this.showSignUp;
      this.showLogin = false;
    },
    switchToLogin() {
      this.showSignUp = false;
      this.showLogin = true;
    },
  },
};
</script>

<style scoped>
.top-bar {
  background-color: #00c897;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.brand-logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.brand-logo img {
  margin-right: 10px;
  width: 30px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
}

.nav-links button {
  color: white;
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  margin-left: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.nav-links button.cart-button {
  display: flex;
  align-items: center;
}

.nav-links button:hover,
.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-links button:focus,
.nav-links a:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
