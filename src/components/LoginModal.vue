<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div class="links">
        <router-link to="/recover-password" @click="$emit('close')"
          >Forgot password?</router-link
        >
        <a href="#" @click.prevent="$emit('openSignUp')"
          >Don’t have an account? Sign Up</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["isVisible"],
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },

  methods: {
    async login() {
      this.errorMessage = "";
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/user/login`,
          {
            email: this.email,
            password: this.password,
          }
        );

        const { user, token, avatar_url } = response.data.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        if (avatar_url) {
          localStorage.setItem("avatar_url", avatar_url);
        }

        this.$emit("loginSuccess", user);

        if (user.is_admin) {
          localStorage.setItem("is_admin", true); // Set admin flag
          this.$router.push("/admin");
        } else {
          localStorage.removeItem("is_admin"); // Remove admin flag if not admin
          this.$router.push("/");
        }

        window.location.reload(); // Reload to trigger redirect logic
      } catch (error) {
        this.errorMessage = "Invalid email or password. Please try again."; // Set the error message
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}
.close {
  float: right;
  cursor: pointer;
}
.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.links a {
  color: #4ec690;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
.error-message {
  color: red;
  margin-bottom: 20px;
}
</style>
