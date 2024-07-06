<template>
  <div id="app">
    <top-bar @openLoginModal="showLoginModal" :user="user" @logout="logout" />
    <router-view></router-view>
    <LoginModal
      :isVisible="isLoginModalVisible"
      @close="isLoginModalVisible = false"
      @loginSuccess="handleLoginSuccess"
      @openSignUp="openSignUpModal"
    />
    <SignUpModal
      :isVisible="isSignUpModalVisible"
      @close="isSignUpModalVisible = false"
      @signUpSuccess="handleSignUpSuccess"
      @openLogin="openLoginModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import TopBar from "./components/TopBar.vue";
import LoginModal from "./components/LoginModal.vue";
import SignUpModal from "./components/SignUpModal.vue";

export default {
  components: {
    TopBar,
    LoginModal,
    SignUpModal,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isSignUpModalVisible: false,
      user: null,
    };
  },
  methods: {
    handleLoginSuccess(user) {
      this.user = user;
      this.isLoginModalVisible = false; // Hide the modal on login success
    },
    handleSignUpSuccess(user) {
      this.user = user;
      this.isSignUpModalVisible = false; // Hide the modal on sign up success
    },
    openLoginModal() {
      this.isLoginModalVisible = true;
      this.isSignUpModalVisible = false;
    },
    openSignUpModal() {
      this.isSignUpModalVisible = true;
      this.isLoginModalVisible = false;
    },
    async autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_ROOT_API}/api/v1/user`
          );
          this.user = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
    },
    logout() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/api/v1/user/logout`)
        .then((response) => {
          console.log(response.data.message);

          // Clear the user data and token from local storage
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("avatar_url");
          this.user = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showLoginModal() {
      this.isLoginModalVisible = true;
      this.isSignUpModalVisible = false;
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
