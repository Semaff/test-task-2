import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import ConvertPage from "../pages/ConvertPage.vue";

const routes = [
  { path: "/", component: HomePage, props: true },
  { path: "/convert", component: ConvertPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
