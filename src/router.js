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
      path: "/story/:id",
      name: "story",
      component: () => import("./views/Story.vue"),
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
          name: "dashboarddefault",
          redirect: "overview",
        },
        {
          path: "overview",
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
          name: "characters-list",
          component: Characters,
        },
        {
          path: "edit/:id",
          name: "edit",
          component: () => import("./views/dashboard/EditStory.vue"),
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("./views/dashboard/Settings.vue"),
        },
        {
          path: "characters/:id",
          name: "character-details",
          component: () => import("./views/dashboard/EditCharacter.vue"),
        },
        {
          path: "addCharacter",
          name: "new-character-details",
          meta: { requiresAdmin: true },
          component: () => import("./views/dashboard/AddCharacter.vue"),
        },
      ],
    },
  ],
});

//route guard
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated()
  ) {
    next({
      path: "/login",
      // query: { redirect: to.fullPath },
    });
  }

  if (
    isAuthenticated() &&
    to.matched.some((record) => record.meta.requiresAdmin) &&
    currentUser.role != "admin"
  ) {
    next({ path: "/dashboard" });
  }

  next();
});

export default router;
