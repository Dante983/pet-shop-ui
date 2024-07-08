import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Blog from "@/views/Blog.vue";
import Cart from "@/views/Cart.vue";
import RecoverPassword from "@/views/RecoverPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
