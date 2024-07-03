<template>
  <div id="app">
    <TopBar @show-login-modal="showLoginModal = true" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <router-view />
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
  name: "App",
  components: {
    TopBar,
    LoginModal,
  },
  data() {
    return {
      showLoginModal: false,
    };
  },
};
</script>

<style>
/* Add global styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
