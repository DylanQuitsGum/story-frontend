import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@views/dashboard/Dashboard.vue";
import Overview from "@views/dashboard/Overview.vue";
import Settings from "@views/dashboard/Settings.vue";
import Characters from "@views/dashboard/Characters.vue";

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
      component: Dashboard,
      children: [
        {
          path: "overview",
          component: Overview,
        },
        {
          path: "settings",
          component: Settings,
        },
        {
          path: "characters",
          component: Characters,
        },
        // {
        //   path: "stories",
        //   component: () => import("./views/dashboard/Stories.vue"),
        // },
      ],
    },
  ],
});

export default router;
