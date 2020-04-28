import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import User from "../views/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/updateUsersById",
    query: "/:id",
    name: "Edit User",
    component: User
  },
  {
    path: "/createUser",
    name: "Create User",
    component: User
  }
];

const router = new VueRouter({
  routes
});

export default router;
