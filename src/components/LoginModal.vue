<template>
  <div class="modal-mask" v-if="visible">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-logo">
            <img src="@/assets/logo.png" alt="PetShop Logo" />
          </div>
          <h3>Log in</h3>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <input
              type="email"
              v-model="email"
              placeholder="Email Address *"
              required
            />
            <input
              type="password"
              v-model="password"
              placeholder="Password *"
              required
            />
            <div class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <label>Remember me</label>
            </div>
            <button type="submit">Log In</button>
          </form>
          <div class="modal-footer">
            <a href="#">Forgot password?</a>
            <a href="#">Don't have an account? Sign Up</a>
          </div>
        </div>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

console.log("asdasdas");
export default {
  name: "LoginModal",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      visible: true,
    };
  },
  methods: {
    submitForm() {
      const data = {
        email: this.email,
        password: this.password,
        remember_me: this.rememberMe,
      };
      console.log(data);
      axios
        .post("http://127.0.0.1:8000/api/v1/user/login", data)
        .then((response) => {
          console.log(response.data);
          // Handle successful login
          this.$emit("close");
        })
        .catch((error) => {
          console.error(error);
          // Handle login error
        });
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background: white;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.modal-logo img {
  width: 50px;
  margin-right: 10px;
}
.modal-body form {
  display: flex;
  flex-direction: column;
}
.modal-body input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}
.modal-body .remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.modal-body .remember-me input {
  margin-right: 5px;
}
.modal-body button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.modal-body button:hover {
  background-color: #0056b3;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.modal-footer a {
  color: #007bff;
  text-decoration: none;
}
.modal-footer a:hover {
  text-decoration: underline;
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
