<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Login</h2>
      <form @submit.prevent="login">
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
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/user/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        const { user, token } = response.data.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        this.$emit("loginSuccess", user);
        this.$emit("close");
      } catch (error) {
        console.error("Login error:", error);
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
</style>
