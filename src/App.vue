<template>
  <div id="app">
    <top-bar @openLoginModal="isLoginModalVisible = true" :user="user" />
    <router-view></router-view>
    <LoginModal
      :isVisible="isLoginModalVisible"
      @close="isLoginModalVisible = false"
      @loginSuccess="handleLoginSuccess"
    />
  </div>
</template>

<script>
import axios from "axios";
import TopBar from "./components/TopBar.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
  components: {
    TopBar,
    LoginModal,
  },
  data() {
    return {
      isLoginModalVisible: false,
      user: null,
    };
  },
  methods: {
    handleLoginSuccess(user) {
      this.user = user;
    },
    async autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/user");
          this.user = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
    },
  },
  created() {
    this.autoLogin();
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
