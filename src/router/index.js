import { createRouter, createWebHistory } from "vue-router";
import Products from "@/views/Products.vue";
import Promotions from "@/views/Promotions.vue";
import Blog from "@/views/Blog.vue";
import Cart from "@/views/Cart.vue";

const routes = [
  {
    path: "/",
    name: "Products",
    component: Products,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
