<template>
  <div class="admin-products">
    <div class="header">
      <h1>Products</h1>
      <button @click="openAddProductModal" class="add-new-button">
        Add New Product
      </button>
      <button @click="toggleFilters" class="filters-button">Filters</button>
    </div>
    <div class="filters-container" v-if="showFilters">
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="search" @input="applyFilters" />
      </div>
      <div>
        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          v-model="category"
          @input="applyFilters"
        />
      </div>
      <div>
        <label for="brand">Brand:</label>
        <input type="text" id="brand" v-model="brand" @input="applyFilters" />
      </div>
      <button @click="clearFilters">Clear Filters</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.uuid"
            @mouseover="hoveredRow = product.uuid"
            @mouseleave="hoveredRow = null"
            :class="{ hovered: hoveredRow === product.uuid }"
          >
            <td>
              <img
                :src="
                  product.image
                    ? `${VUE_APP_ROOT_API}/storage/${product.image}`
                    : placeholderImage
                "
                alt="Product Image"
                class="product-image"
              />
            </td>
            <td>{{ product.title }}</td>
            <td>{{ product.brand_name }}</td>
            <td>{{ product.category_name }}</td>
            <td>{{ product.price }} kn</td>
            <td>{{ new Date(product.created_at).toLocaleDateString() }}</td>
            <td>
              <i class="fas fa-pencil-alt" @click="editProduct(product)"></i>
              <i
                v-if="confirmDeleteId !== product.uuid"
                class="fas fa-trash-alt"
                @click="confirmDelete(product.uuid)"
              ></i>
              <span v-else>
                <i
                  class="fas fa-check"
                  @click="deleteProduct(product.uuid)"
                ></i>
                <i class="fas fa-times" @click="cancelDelete"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddProductModal
      :isVisible="isAddProductModalVisible"
      @close="isAddProductModalVisible = false"
      @productAdded="fetchProducts"
    />
    <EditProductModal
      :isVisible="isEditProductModalVisible"
      :product="selectedProduct"
      @close="isEditProductModalVisible = false"
      @productUpdated="fetchProducts"
    />
  </div>
</template>

<script>
import axios from "axios";
import AddProductModal from "@/components/AddProductModal.vue";
import EditProductModal from "@/components/EditProductModal.vue";
import placeholderImage from "@/assets/placeholder.png";

// Access the environment variable
const VUE_APP_ROOT_API = process.env.VUE_APP_ROOT_API;

export default {
  name: "Products",
  components: {
    AddProductModal,
    EditProductModal,
  },
  data() {
    return {
      products: [],
      hoveredRow: null,
      isAddProductModalVisible: false,
      isEditProductModalVisible: false,
      selectedProduct: null,
      confirmDeleteId: null,
      placeholderImage: placeholderImage,
      showFilters: false,
      search: "",
      category: "",
      brand: "",
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          (!this.search ||
            product.title.toLowerCase().includes(this.search.toLowerCase())) &&
          (!this.category ||
            product.category
              .toLowerCase()
              .includes(this.category.toLowerCase())) &&
          (!this.brand ||
            product.brand.toLowerCase().includes(this.brand.toLowerCase()))
        );
      });
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          `${VUE_APP_ROOT_API}/api/v1/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.products = response.data.map((product) => {
          const metadata = JSON.parse(product.metadata);
          return {
            ...product,
            brand: metadata.brand || "Unknown",
            image: metadata.image || null,
          };
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    openAddProductModal() {
      this.isAddProductModalVisible = true;
    },
    editProduct(product) {
      this.selectedProduct = product;
      this.isEditProductModalVisible = true;
    },
    confirmDelete(uuid) {
      this.confirmDeleteId = uuid;
    },
    cancelDelete() {
      this.confirmDeleteId = null;
    },
    async deleteProduct(uuid) {
      try {
        await axios.delete(`${VUE_APP_ROOT_API}/api/v1/products/${uuid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.fetchProducts();
        this.confirmDeleteId = null;
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    applyFilters() {
      // This will trigger computed property to recalculate filteredProducts
    },
    clearFilters() {
      this.search = "";
      this.category = "";
      this.brand = "";
      this.applyFilters();
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.admin-products {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-new-button {
  background-color: #4ec690;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.filters-button {
  background-color: #4ec690;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

button {
  background-color: #4ec690;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

button:last-child {
  background-color: #e74c3c;
}

tr.hovered {
  background-color: #f0f0f0;
}

.fas {
  cursor: pointer;
  margin-right: 10px;
}

.fas.fa-pencil-alt {
  color: #4ec690;
}

.fas.fa-trash-alt {
  color: #e74c3c;
}

.fas.fa-check {
  color: #4ec690;
}

.fas.fa-times {
  color: #e74c3c;
}

.filters-container {
  margin-bottom: 20px;
}

.filters-container > div {
  margin-bottom: 10px;
}
</style>
