<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Edit Customer</h2>
      <form @submit.prevent="updateCustomer">
        <div class="avatar-upload">
          <img
            :src="avatarPreview || userAvatar || placeholderImage"
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
        <button type="submit">Update Customer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["isVisible", "user"],
  data() {
    return {
      firstName: this.user ? this.user.first_name : "",
      lastName: this.user ? this.user.last_name : "",
      email: this.user ? this.user.email : "",
      phoneNumber: this.user ? this.user.phone_number : "",
      address: this.user ? this.user.address : "",
      avatar: null,
      avatarPreview: null,
      userAvatar: this.user ? this.user.avatar : "",
      placeholderImage: require("@/assets/placeholder.png"), // Update with actual path to placeholder image
    };
  },
  watch: {
    user(newVal) {
      if (newVal) {
        this.firstName = newVal.first_name;
        this.lastName = newVal.last_name;
        this.email = newVal.email;
        this.phoneNumber = newVal.phone_number;
        this.address = newVal.address;
        this.userAvatar = newVal.avatar;
      }
    },
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
    async updateCustomer() {
      try {
        const formData = new FormData();
        formData.append("first_name", this.firstName);
        formData.append("last_name", this.lastName);
        formData.append("email", this.email);
        formData.append("phone_number", this.phoneNumber);
        formData.append("address", this.address);
        if (this.avatar) {
          formData.append("avatar", this.avatar);
        }

        await axios.put(
          `${process.env.VUE_APP_ROOT_API}/api/v1/admin/user-edit/${this.user.uuid}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.$emit("customerUpdated");
        this.$emit("close");
      } catch (error) {
        console.error("Error updating customer:", error);
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

.avatar-upload {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

button {
  background-color: #4ec690;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #3cae78;
}
</style>
