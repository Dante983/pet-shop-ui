<template>
  <div class="admin-dashboard">
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <GChart
          type="LineChart"
          :data="chartData"
          :options="chartOptions"
          :width="'100%'"
          :height="400"
        />
      </div>
      <div class="stats">
        <div class="stat-box">
          <h3>Total Earnings</h3>
          <p>$2,405</p>
        </div>
        <div class="stat-box">
          <h3>Orders this Month</h3>
          <p>30</p>
        </div>
        <div class="stat-box">
          <h3>Potential Earnings</h3>
          <p>$1,224</p>
        </div>
      </div>
      <div class="latest-sales">
        <h3>Latest Sales</h3>
        <table>
          <thead>
            <tr>
              <th>Order UUID</th>
              <th>Status</th>
              <th># Ordered Products</th>
              <th>Customer</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in latestSales" :key="sale.uuid">
              <td>{{ sale.uuid }}</td>
              <td>{{ sale.status }}</td>
              <td>{{ sale.orderedProducts }}</td>
              <td>{{ sale.customer }}</td>
              <td>{{ sale.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "AdminDashboard",
  components: {
    GChart,
  },
  data() {
    return {
      chartData: [
        ["Day", "Sales"],
        ["1", 100],
        ["2", 80],
        ["3", 90],
        ["4", 60],
        ["5", 70],
        ["6", 90],
        ["7", 100],
        ["8", 80],
        ["9", 90],
        ["10", 60],
        ["11", 70],
        ["12", 90],
        ["13", 100],
        ["14", 80],
        ["15", 90],
        ["16", 60],
        ["17", 70],
        ["18", 90],
        ["19", 100],
        ["20", 80],
        ["21", 90],
        ["22", 60],
        ["23", 70],
        ["24", 90],
        ["25", 100],
        ["26", 80],
        ["27", 90],
        ["28", 60],
        ["29", 70],
        ["30", 90],
      ],
      chartOptions: {
        title: "Monthly Sales",
        curveType: "function",
        legend: { position: "bottom" },
      },
      latestSales: [
        {
          uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2",
          status: "Open",
          orderedProducts: 3,
          customer: "John Robinson",
          amount: "$39.97",
        },
        {
          uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2",
          status: "Pending payment",
          orderedProducts: 2,
          customer: "Michael Hurley",
          amount: "$12",
        },
        {
          uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2",
          status: "Paid",
          orderedProducts: 1,
          customer: "Ricardo Matterson",
          amount: "$60",
        },
        {
          uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2",
          status: "Shipped",
          orderedProducts: 1,
          customer: "John Robinson",
          amount: "$7",
        },
        {
          uuid: "083d0036-9616-3f1e-9b03-4fe51ad2e1c2",
          status: "Cancelled",
          orderedProducts: 1,
          customer: "Michael Hurley",
          amount: "$14",
        },
      ],
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.stat-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex-grow: 1;
  margin-right: 20px;
}

.stat-box:last-child {
  margin-right: 0;
}

.latest-sales {
  margin-top: 20px;
}

.latest-sales table {
  width: 100%;
  border-collapse: collapse;
}

.latest-sales th,
.latest-sales td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
