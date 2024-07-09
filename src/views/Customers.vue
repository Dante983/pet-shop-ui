<template>
  <div class="admin-customers">
    <div class="header">
      <h1>Customers</h1>
      <div class="header-actions">
        <button @click="toggleFilterPanel" class="filter-button">
          <i class="fas fa-filter"></i> Filter
        </button>
        <button @click="openAddCustomerModal" class="add-new-button">
          Add New Customer
        </button>
      </div>
    </div>
    <div v-if="showFilterPanel" class="filter-panel">
      <div class="filter-row">
        <input
          type="text"
          v-model="filters.name"
          placeholder="Customer name"
          @input="fetchFilteredCustomers"
        />
        <input
          type="text"
          v-model="filters.email"
          placeholder="Customer email"
          @input="fetchFilteredCustomers"
        />
        <input
          type="text"
          v-model="filters.phone"
          placeholder="Customer phone"
          @input="fetchFilteredCustomers"
        />
        <input
          type="text"
          v-model="filters.address"
          placeholder="Customer address"
          @input="fetchFilteredCustomers"
        />
        <input
          type="date"
          v-model="filters.date_created"
          placeholder="Date created"
          @input="fetchFilteredCustomers"
        />
        <select
          v-model="filters.marketing_preferences"
          @change="fetchFilteredCustomers"
        >
          <option value="">Marketing preferences</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button @click="resetFilters" class="reset-button">RESET</button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Date Created</th>
            <th>Marketing Preferences</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.uuid"
            @mouseover="hoveredRow = user.uuid"
            @mouseleave="hoveredRow = null"
            :class="{ hovered: hoveredRow === user.uuid }"
          >
            <td>
              <img
                :src="user.avatar || placeholderImage"
                alt="Avatar"
                class="avatar"
              />
            </td>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone_number }}</td>
            <td>{{ user.address }}</td>
            <td>{{ new Date(user.created_at).toLocaleDateString() }}</td>
            <td>{{ user.is_marketing ? "Yes" : "No" }}</td>
            <td>
              <i class="fas fa-pencil-alt" @click="editUser(user)"></i>
              <i
                v-if="confirmDeleteId !== user.uuid"
                class="fas fa-trash-alt"
                @click="confirmDelete(user.uuid)"
              ></i>
              <span v-else>
                <i class="fas fa-check" @click="deleteUser(user.uuid)"></i>
                <i class="fas fa-times" @click="cancelDelete"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddCustomerModal
      :isVisible="isAddCustomerModalVisible"
      @close="isAddCustomerModalVisible = false"
      @customerAdded="fetchUsers"
    />
    <EditCustomerModal
      :isVisible="isEditCustomerModalVisible"
      :user="selectedUser"
      @close="isEditCustomerModalVisible = false"
      @customerUpdated="fetchUsers"
    />
  </div>
</template>

<script>
import axios from "axios";
import AddCustomerModal from "@/components/AddCustomerModal.vue";
import EditCustomerModal from "@/components/EditCustomerModal.vue";
import placeholderImage from "@/assets/placeholder.png";

export default {
  name: "Customers",
  components: {
    AddCustomerModal,
    EditCustomerModal,
  },
  data() {
    return {
      users: [],
      hoveredRow: null,
      isAddCustomerModalVisible: false,
      isEditCustomerModalVisible: false,
      selectedUser: null,
      confirmDeleteId: null,
      showFilterPanel: false,
      filters: {
        name: "",
        email: "",
        phone: "",
        address: "",
        date_created: "",
        marketing_preferences: "",
      },
      placeholderImage: placeholderImage,
    };
  },
  methods: {
    toggleFilterPanel() {
      this.showFilterPanel = !this.showFilterPanel;
    },
    async fetchUsers() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_ROOT_API}/api/v1/admin/user-listing`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.users = response.data.data.map((user) => ({
          ...user,
          avatar: user.avatar ? user.avatar : null,
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchFilteredCustomers() {
      const params = {};
      Object.keys(this.filters).forEach((key) => {
        if (this.filters[key]) {
          params[key] = this.filters[key];
        }
      });
      const response = await axios.get(
        `${process.env.VUE_APP_ROOT_API}/api/v1/admin/user-listing`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params,
        }
      );
      this.users = response.data.data.map((user) => ({
        ...user,
        avatar: user.avatar ? user.avatar : null,
      }));
    },
    resetFilters() {
      this.filters = {
        name: "",
        email: "",
        phone: "",
        address: "",
        date_created: "",
        marketing_preferences: "",
      };
      this.fetchUsers();
    },
    openAddCustomerModal() {
      this.isAddCustomerModalVisible = true;
    },
    editUser(user) {
      this.selectedUser = user;
      this.isEditCustomerModalVisible = true;
    },
    confirmDelete(uuid) {
      this.confirmDeleteId = uuid;
    },
    cancelDelete() {
      this.confirmDeleteId = null;
    },
    async deleteUser(uuid) {
      try {
        await axios.delete(
          `${process.env.VUE_APP_ROOT_API}/api/v1/admin/user-delete/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.fetchUsers();
        this.confirmDeleteId = null;
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.admin-customers {
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

.header-actions {
  display: flex;
  align-items: center;
}

.filter-button {
  background-color: #4ec690;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.filter-panel {
  margin: 20px 0;
  padding: 10px;
  background-color: #f7f9fa;
  border-radius: 5px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
}

.filter-row input,
.filter-row select {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
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

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
</style>
