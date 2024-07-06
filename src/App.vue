<template>
  <div id="app">
    <top-bar
      @openLoginModal="isLoginModalVisible = true"
      :user="user"
      @logout="logout"
    />
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
      this.isLoginModalVisible = false; // Hide the modal on login success
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
      // Clear the user data and token from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("avatar_url");
      this.user = null;

      // Optionally, make an API call to logout the user from the server
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/api/v1/user/logout`)
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
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
