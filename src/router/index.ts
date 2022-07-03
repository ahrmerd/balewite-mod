import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { isLoggedIn } from "@/utils/auth";
import { useNavigation } from "@/composables/useNavigation";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/quizzes",
    name: "Quizzes",
    component: () => import("../views/quizzes/Quizzes.vue"),
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("../views/courses/Courses.vue"),
  },
  {
    path: "/courses/:id",
    name: "Course",
    component: () => import("../views/courses/Course.vue"),
  },
  {
    path: "/quizzes/:id",
    name: "Quiz",
    component: () => import("../views/quizzes/Quiz.vue"),
  },
  {
    path: "/announcements",
    name: "Announcements",
    component: () => import("../views/announcements/Announcements.vue"),
  },
  {
    path: "/articles",
    name: "Articles",
    component: () => import("../views/articles/Articles.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
    meta: {
      authNotRequired: true,
    },
  },

  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
    meta: {
      authNotRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const nav = useNavigation();
  nav.closeNav();
  const authenticated = isLoggedIn();
  const authNotRequired = to.matched.some(
    (record) => record.meta.authNotRequired
  );

  const reqAuth = !authNotRequired;
  if (reqAuth) {
    if (authenticated) {
      next();
    } else {
      router.push({ name: "Login" });
    }
  } else {
    if (authenticated) {
      router.push({ name: "Home" });
    } else {
      next();
    }
  }
});

export default router;
