import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/post/:postId",
    name: "PostDetail",
    component: () => import("../views/PostDetail.vue"),
  },
  {
    path: "/my-posts",
    name: "MyPosts",
    component: () => import("../views/ListPost.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !localStorage.access_token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && localStorage.access_token) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
