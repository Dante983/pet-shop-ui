<template>
  <div class="reset-password">
    <h2>Reset Password</h2>
    <form @submit.prevent="resetPassword">
      <div>
        <label for="password">New Password *</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password *</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      token: this.$route.query.token, // Assume token is passed as a query parameter
    };
  },
  mounted() {
    this.email = localStorage.getItem("recoveryEmail"); // Retrieve email from local storage
    if (!this.email) {
      alert(
        "No recovery email found. Please retry the password recovery process."
      );
      this.$router.push("/recover-password");
    }
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/user/reset-password-token`,
          {
            email: this.email,
            token: this.token,
            password: this.password,
            password_confirmation: this.confirmPassword,
          }
        );

        alert("Password reset successfully");
        this.$router.push("/"); // Redirect to login page after password reset
      } catch (error) {
        console.error(error);
        alert("There was an error resetting your password. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  max-width: 400px;
  text-align: center;
}
h2 {
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
label {
  align-self: flex-start;
  margin-bottom: 5px;
}
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #4ec690;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45b382;
}
</style>
