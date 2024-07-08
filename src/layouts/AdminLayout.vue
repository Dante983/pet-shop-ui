<template>
  <div class="admin-layout">
    <div class="sidebar">
      <ul>
        <li><router-link to="/admin">Dashboard</router-link></li>
        <li><router-link to="/admin/tickets">All Tickets</router-link></li>
        <li>
          <router-link to="/admin/shipment">Shipment Locator</router-link>
        </li>
        <li><router-link to="/admin/customers">Customers</router-link></li>
        <li><router-link to="/admin/products">Products</router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #4ec690;
  padding: 20px;
  color: white;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
