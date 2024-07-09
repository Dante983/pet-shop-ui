<template>
  <div id="app">
    <top-bar
      @openUserSettings="openUserSettingsModal"
      @openLoginModal="showLoginModal"
      :user="user"
      @logout="logout"
    />
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
    <UserSettingsModal
      :user="user"
      :isVisible="isUserSettingsModalVisible"
      @close="isUserSettingsModalVisible = false"
    />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import TopBar from "./components/TopBar.vue";
import LoginModal from "./components/LoginModal.vue";
import SignUpModal from "./components/SignUpModal.vue";
import UserSettingsModal from "./components/UserSettingsModal.vue";
import Cookies from "js-cookie";
import Footer from "./components/Footer.vue";

export default {
  components: {
    TopBar,
    LoginModal,
    SignUpModal,
    UserSettingsModal,
    Footer,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isSignUpModalVisible: false,
      isUserSettingsModalVisible: false,
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
    openUserSettingsModal() {
      this.isUserSettingsModalVisible = true;
    },
    async autoLogin() {
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_ROOT_API}/api/v1/user`
          );
          this.user = response.data;
          localStorage.setItem("token", token); // Ensure token is in localStorage
        } catch (error) {
          console.error("Error fetching user data:", error);
          this.clearAuthData();
        }
      }

      // Redirect to appropriate route based on user role
      if (localStorage.getItem("is_admin")) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/");
      }
    },
    logout() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/api/v1/user/logout`)
        .then((response) => {
          console.log(response.data.message);
          this.clearAuthData();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showLoginModal() {
      this.isLoginModalVisible = true;
      this.isSignUpModalVisible = false;
    },
    clearAuthData() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("avatar_url");
      localStorage.removeItem("is_admin");

      Cookies.remove("token");
      delete axios.defaults.headers.common["Authorization"];
      this.user = null;
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  background-color: #4ec690;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>
