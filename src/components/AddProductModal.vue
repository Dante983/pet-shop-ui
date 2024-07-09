<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>New Product</h2>
      <form @submit.prevent="addProduct">
        <div class="product-image-upload">
          <img
            :src="imageUrl || placeholderImage"
            alt="Product Image"
            class="product-image"
            @click="triggerFileUpload"
          />
          <input
            type="file"
            ref="imageInput"
            @change="handleImageChange"
            style="display: none"
          />
          <span v-if="imageUrl" @click="removeImage">Remove Image</span>
        </div>
        <div class="form-group">
          <label for="brand">Brand Name</label>
          <input type="text" v-model="form.brand" id="brand" required />
        </div>
        <div class="form-group">
          <label for="name">Product Name</label>
          <input type="text" v-model="form.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" v-model="form.category" id="category" required />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" v-model="form.price" id="price" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="form.description"
            id="description"
            required
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import placeholderImage from "@/assets/placeholder.png";

export default {
  props: ["isVisible"],
  data() {
    return {
      form: {
        brand: "",
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
      },
      imageUrl: "",
      placeholderImage: placeholderImage,
    };
  },
  methods: {
    triggerFileUpload() {
      this.$refs.imageInput.click();
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
        this.form.image = file;
      }
    },
    removeImage() {
      this.imageUrl = "";
      this.form.image = null;
    },
    async addProduct() {
      const formData = new FormData();
      formData.append("brand", this.form.brand);
      formData.append("name", this.form.name);
      formData.append("category", this.form.category);
      formData.append("price", this.form.price);
      formData.append("description", this.form.description);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }

      try {
        await axios.post(
          `${process.env.VUE_APP_ROOT_API}/api/v1/products/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.$emit("productAdded");
        this.$emit("close");
      } catch (error) {
        console.error("Error adding product:", error);
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
  width: 500px;
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

.product-image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.product-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  align-self: flex-start;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #4ec690;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

button:hover {
  background-color: #45b382;
}

span {
  color: #e74c3c;
  cursor: pointer;
  margin-top: 10px;
}
</style>
