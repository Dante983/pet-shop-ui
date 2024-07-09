<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Edit Customer</h2>
      <form @submit.prevent="updateCustomer">
        <div class="avatar-upload">
          <img
            :src="avatarUrl || placeholderImage"
            alt="Avatar"
            class="avatar-placeholder"
            @click="triggerFileUpload"
          />
          <input
            type="file"
            ref="avatarInput"
            @change="handleAvatarChange"
            style="display: none"
          />
        </div>
        <div>
          <label for="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            v-model="form.first_name"
            required
          />
        </div>
        <div>
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" v-model="form.last_name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div>
          <label for="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            v-model="form.phone_number"
            required
          />
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="form.address" required />
        </div>
        <button type="submit">Update Customer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import placeholderImage from "@/assets/placeholder.png";

export default {
  props: ["isVisible", "user"],
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        avatar: null, // Add avatar to form data
      },
      avatarUrl: "",
      placeholderImage: placeholderImage,
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.form = {
            ...newUser,
            avatar: null, // Reset avatar field
          };
          this.avatarUrl = newUser.avatar || this.placeholderImage;
        }
      },
    },
  },
  methods: {
    triggerFileUpload() {
      this.$refs.avatarInput.click();
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatarUrl = URL.createObjectURL(file);
        this.form.avatar = file; // Update form data with the file
      }
    },
    async updateCustomer() {
      const formData = new URLSearchParams();
      formData.append("first_name", this.form.first_name);
      formData.append("last_name", this.form.last_name);
      formData.append("email", this.form.email);
      formData.append("phone_number", this.form.phone_number);
      formData.append("address", this.form.address);

      if (this.form.avatar) {
        // Convert the avatar file to a base64 string and append to formData
        const reader = new FileReader();
        reader.readAsDataURL(this.form.avatar);
        reader.onloadend = async () => {
          formData.append("avatar", reader.result);

          try {
            const response = await axios.put(
              `${process.env.VUE_APP_ROOT_API}/api/v1/admin/user-edit/${this.form.uuid}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
            console.log("Response:", response.data);
            this.$emit("customerUpdated");
            this.$emit("close");
          } catch (error) {
            console.error("Error updating customer:", error);
          }
        };
      } else {
        try {
          const response = await axios.put(
            `${process.env.VUE_APP_ROOT_API}/api/v1/admin/user-edit/${this.form.uuid}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log("Response:", response.data);
          this.$emit("customerUpdated");
          this.$emit("close");
        } catch (error) {
          console.error("Error updating customer:", error);
        }
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
