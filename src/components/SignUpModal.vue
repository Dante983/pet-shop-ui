<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <img src="@/assets/logo.png" alt="petson logo" class="logo" />
      <h2>Sign up</h2>
      <form @submit.prevent="signUp">
        <div class="name-fields">
          <div class="form-group">
            <label for="first-name">First Name *</label>
            <input type="text" id="first-name" v-model="firstName" required />
          </div>
          <div class="form-group">
            <label for="last-name">Last Name *</label>
            <input type="text" id="last-name" v-model="lastName" required />
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email *</label>
          <input type="email" id="email" name="email" />
        </div>

        <div class="form-group">
          <label for="password">Password *</label>
          <input type="password" id="password" name="password" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm Password *</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
        </div>
        <div class="newsletter">
          <input type="checkbox" id="is_marketing" v-model="is_marketing" />
          <label for="is_marketing"
            >I want to receive inspiration, marketing promotions and updates via
            email.</label
          >
        </div>
        <button type="submit">Sign up</button>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
      <div class="links">
        <a href="#" @click.prevent="$emit('openLogin')"
          >Already have an account? Log in</a
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      is_marketing: false,
      errorMessage: "",
    };
  },
  methods: {
    async signUp() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/user/create`,
          {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            is_marketing: this.is_marketing,
            password_confirmation: this.confirmPassword,
          }
        );

        const { user, token, avatar_url } = response.data.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        if (avatar_url) {
          localStorage.setItem("avatar_url", avatar_url);
        }

        this.$emit("signUpSuccess", user);
        this.$emit("close");
        window.location.reload();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
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
  padding: 40px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.close {
  float: right;
  cursor: pointer;
  font-size: 1.5em;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group input {
  margin-top: 5px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #4ec690;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #3db580;
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
