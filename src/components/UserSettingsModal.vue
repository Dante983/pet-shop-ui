<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div class="user-header">
        <img :src="user.avatar" class="avatar-large" />
        <div class="user-info">
          <h2>User settings</h2>
          <div class="user-details">
            <div>
              <strong>Name</strong> {{ user.first_name }} {{ user.last_name }}
            </div>
            <div><strong>Phone number</strong> {{ user.phone_number }}</div>
            <div><strong>Address</strong> {{ user.address }}</div>
            <div>
              <strong>Date joined</strong>
              {{ new Date(user.created_at).toLocaleDateString() }}
            </div>
            <div><strong>Email</strong> {{ user.email }}</div>
            <div>
              <strong>Marketing preferences</strong>
              {{ user.is_marketing ? "Yes" : "No" }}
            </div>
          </div>
        </div>
      </div>
      <div class="user-orders">
        <h3>Latest orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order UUID</th>
              <th>Status</th>
              <th>Download invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.uuid">
              <td>{{ order.uuid }}</td>
              <td>
                <span :class="statusClass(order.status)">{{
                  order.status
                }}</span>
              </td>
              <td>
                <button @click="downloadInvoice(order.uuid)">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "isVisible"],
  data() {
    return {
      orders: [
        { uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2", status: "Open" },
        {
          uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2",
          status: "Pending payment",
        },
        { uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2", status: "Paid" },
        { uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2", status: "Shipped" },
        { uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2", status: "Cancelled" },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    statusClass(status) {
      switch (status) {
        case "Open":
          return "status-open";
        case "Pending payment":
          return "status-pending";
        case "Paid":
          return "status-paid";
        case "Shipped":
          return "status-shipped";
        case "Cancelled":
          return "status-cancelled";
      }
    },
    downloadInvoice(uuid) {
      // Add your download invoice logic here
      console.log(`Downloading invoice for order ${uuid}`);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: black;
}

.user-header {
  display: flex;
  align-items: center;
  color: black;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-details {
  display: flex;
  flex-wrap: wrap;
}

.user-details > div {
  flex: 1 1 50%;
  margin-bottom: 10px;
  color: black;
}

.user-orders {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: black;
}

.status-open {
  color: blue;
}

.status-pending {
  color: orange;
}

.status-paid {
  color: green;
}

.status-shipped {
  color: teal;
}

.status-cancelled {
  color: red;
}
</style>
