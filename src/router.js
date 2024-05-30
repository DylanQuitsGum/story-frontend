import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@views/dashboard/Dashboard.vue";
import Overview from "@views/dashboard/Overview.vue";
import Characters from "@views/dashboard/Characters.vue";
import Stories from "@views/dashboard/Stories.vue";
import { isAuthenticated } from "./auth";

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
      meta: {
        requiresAuth: true,
      },
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

//route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
