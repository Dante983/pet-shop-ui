<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Edit Product: {{ product.title }}</h2>
      <form @submit.prevent="updateProduct">
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
        <button type="button" class="delete-button" @click="deleteProduct">
          Delete Product
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import placeholderImage from "@/assets/placeholder.png";
import qs from "qs";

export default {
  props: ["isVisible", "product"],
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
  watch: {
    product: {
      immediate: true,
      handler(newProduct) {
        if (newProduct) {
          const metadata = JSON.parse(newProduct.metadata);
          this.form = {
            uuid: newProduct.uuid || "",
            brand: newProduct.brand_name || "",
            name: newProduct.title || "",
            category: newProduct.category_name || "",
            price: newProduct.price || "",
            description: newProduct.description || "",
            image: metadata.image || null,
          };
          this.imageUrl = metadata.image
            ? `${process.env.VUE_APP_ROOT_API}/storage/${metadata.image}`
            : this.placeholderImage;
        }
      },
    },
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
    async updateProduct() {
      const formData = {
        uuid: this.form.uuid,
        brand: this.form.brand,
        name: this.form.name,
        category: this.form.category,
        price: this.form.price,
        description: this.form.description,
        image: this.form.image ? this.form.image.name : "",
      };

      try {
        await axios.put(
          `${process.env.VUE_APP_ROOT_API}/api/v1/products/${this.product.uuid}`,
          qs.stringify(formData),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.$emit("productUpdated");
        this.$emit("close");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct() {
      try {
        await axios.delete(
          `${process.env.VUE_APP_ROOT_API}/api/v1/products/${this.product.uuid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$emit("productUpdated");
        this.$emit("close");
      } catch (error) {
        console.error("Error deleting product:", error);
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
  width: 600px;
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
  width: 150px;
  height: 150px;
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
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #45b382;
}

.delete-button {
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
