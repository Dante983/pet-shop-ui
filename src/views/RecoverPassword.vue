<template>
  <div class="recover-password">
    <h2>Recover Password</h2>
    <p>
      Enter the email associated with your account and we’ll send an email with
      instructions to reset your password.
    </p>
    <form @submit.prevent="recoverPassword">
      <div>
        <label for="email">Email Address *</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">Get Recovery Link</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async recoverPassword() {
      try {
        await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/user/recover-password`,
          {
            email: this.email,
          }
        );
        alert("A recovery link has been sent to your email.");
      } catch (error) {
        console.error(error);
        alert(
          "There was an error sending the recovery link. Please try again."
        );
      }
    },
  },
};
</script>

<style scoped>
.recover-password {
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
p {
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
input[type="email"] {
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
