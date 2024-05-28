import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@views/dashboard/Dashboard.vue";
import Overview from "@views/dashboard/Overview.vue";
import Characters from "@views/dashboard/Characters.vue";
import Stories from "@views/dashboard/Stories.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "",
          name: "overview",
          component: Overview,
        },
        {
          path: "stories",
          name: "stories",
          component: Stories,
        },
        {
          path: "characters",
          name: "characters",
          component: Characters,
        },
      ],
    },
  ],
});

export default router;
