<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Add New Customer</h2>
      <form @submit.prevent="addCustomer">
        <div class="avatar-upload">
          <img
            :src="avatarPreview || placeholderImage"
            @click="triggerFileInput"
            class="avatar-placeholder"
          />
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            style="display: none"
          />
        </div>
        <div>
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" v-model="firstName" required />
        </div>
        <div>
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" v-model="lastName" required />
        </div>
        <div>
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="phone">Phone Number</label>
          <input type="text" id="phone" v-model="phoneNumber" required />
        </div>
        <div>
          <label for="address">Location</label>
          <input type="text" id="address" v-model="address" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit">Add New Customer</button>
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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      avatarPreview: null,
      placeholderImage: "path/to/placeholder/image.png", // Update with actual placeholder image path
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatar = file;
        this.avatarPreview = URL.createObjectURL(file);
      }
    },
    async addCustomer() {
      try {
        const formData = new FormData();
        formData.append("first_name", this.firstName);
        formData.append("last_name", this.lastName);
        formData.append("email", this.email);
        formData.append("phone_number", this.phoneNumber);
        formData.append("address", this.address);
        formData.append("password", this.password);
        formData.append("password_confirmation", this.confirmPassword);
        if (this.avatar) {
          formData.append("avatar", this.avatar);
        }

        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/user/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.$emit("customerAdded", response.data.data);
        this.$emit("close");
      } catch (error) {
        console.error("Error adding customer:", error);
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
form div {
  margin-bottom: 10px;
}
button {
  background-color: #4ec690;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.avatar-upload {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
}
</style>
