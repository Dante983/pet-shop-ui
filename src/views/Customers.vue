<template>
  <div class="admin-customers">
    <div class="header">
      <h1>Customers</h1>
      <button @click="openAddCustomerModal" class="add-new-button">
        Add New Customer
      </button>
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
          <tr v-for="user in users" :key="user.uuid">
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
              <button @click="editUser(user.uuid)">Edit</button>
              <button @click="deleteUser(user.uuid)">Delete</button>
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
  </div>
</template>

<script>
import axios from "axios";
import AddCustomerModal from "@/components/AddCustomerModal.vue";

export default {
  name: "Customers",
  components: {
    AddCustomerModal,
  },
  data() {
    return {
      users: [],
      isAddCustomerModalVisible: false,
    };
  },
  methods: {
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
        this.users = response.data.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    openAddCustomerModal() {
      this.isAddCustomerModalVisible = true;
    },
    editUser(uuid) {
      this.$router.push(`/admin/edit-user/${uuid}`);
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
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
