import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/",
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
      component: () => import("./views/dashboard/DashboardLayout.vue"),
      children: [
        {
          path: "overview",
          component: () => import("./views/dashboard/Overview.vue"),
        },
        {
          path: "settings",
          component: () => import("./views/dashboard/Settings.vue"),
        },
        {
          path: "characters",
          component: () => import("./views/dashboard/Characters.vue"),
        },
        {
          path: "stories",
          component: () => import("./views/dashboard/Stories.vue"),
        },
      ],
    },
  ],
});

export default router;
