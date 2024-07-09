<template>
  <div class="recover-password">
    <h2>Recover Password</h2>
    <p>
      Enter the email associated with your account and we’ll generate a link to
      reset your password.
    </p>
    <form @submit.prevent="recoverPassword" v-if="!linkSent">
      <div>
        <label for="email">Email Address *</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">Get Recovery Link</button>
    </form>
    <div v-else class="modal">
      <div class="modal-content">
        <span class="close" @click="linkSent = false">&times;</span>
        <p>Click on the URL and change your password:</p>
        <router-link :to="recoveryLink">{{ recoveryLink }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      linkSent: false,
      recoveryLink: "",
    };
  },
  methods: {
    async recoverPassword() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/user/forgot-password`,
          {
            email: this.email,
          }
        );

        this.recoveryLink = response.data.recovery_link;
        this.linkSent = true;
      } catch (error) {
        console.error(error);
        alert(
          "There was an error generating the recovery link. Please try again."
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
  width: 400px;
  text-align: center;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}
</style>
