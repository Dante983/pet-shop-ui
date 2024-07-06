<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <img src="@/assets/logo.png" alt="Logo" class="modal-logo" />
      <h2>Sign up</h2>
      <form @submit.prevent="signUp">
        <div class="form-group">
          <input
            type="text"
            v-model="firstName"
            placeholder="First Name *"
            required
          />
          <input
            type="text"
            v-model="lastName"
            placeholder="Last Name *"
            required
          />
        </div>
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
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password *"
          required
        />
        <div class="form-group">
          <input type="checkbox" v-model="receiveMarketing" />
          <label
            >I want to receive inspiration, marketing promotions and updates via
            email.</label
          >
        </div>
        <button type="submit">SIGN UP</button>
      </form>
      <p class="login-link">
        Already have an account?
        <a href="#" @click.prevent="goToLogin">Log in</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUpModal",
  props: ["show"],
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      receiveMarketing: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    goToLogin() {
      this.$emit("switchToLogin");
    },
    async signUp() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/user/create",
          {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            receive_marketing: this.receiveMarketing,
          }
        );
        console.log(response);
        alert("Sign up successful");
        this.closeModal();
      } catch (error) {
        alert("Sign up failed: " + error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-logo {
  display: block;
  margin: 0 auto 20px auto;
  width: 50px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: calc(50% - 10px);
  padding: 10px;
  margin-bottom: 10px;
}

input[type="email"],
input[type="password"] {
  width: calc(100% - 20px);
}

input[type="checkbox"] {
  margin-right: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #00c897;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link a {
  color: #00c897;
  text-decoration: none;
}
</style>
