import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Blog from "@/views/Blog.vue";
import Cart from "@/views/Cart.vue";
import RecoverPassword from "@/views/RecoverPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import Customers from "@/views/Customers.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Products from "@/views/Products.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/promotions",
    name: "Promotions",
    component: Promotions,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/recover-password",
    name: "recover-password",
    component: RecoverPassword,
  },
  {
    path: "/forgot-password",
    name: "reset-password",
    component: ResetPassword,
  },
  {
    path: "/products/:uuid",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "customers",
        name: "Customers",
        component: Customers,
      },
      {
        path: "products",
        name: "Products",
        component: Products,
      },
      // Add other admin routes here
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAdminRoute = to.matched.some((record) => record.meta.isAdmin);
  const user = JSON.parse(localStorage.getItem("user"));

  if (requiresAuth && !user) {
    next("/");
  } else if (isAdminRoute && (!user || !user.is_admin)) {
    next("/");
  } else {
    next();
  }
});

export default router;
