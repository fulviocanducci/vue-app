import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import { Home, Form, Update } from "./components";

const router = new VueRouter({
  routes: [
    { name: "home", path: "/", component: Home },
    { name: "form", path: "/form", component: Form },
    { name: "form-create", path: "/form/create", component: Update },
    { name: "form-update", path: "/form/update/:id", component: Update },
  ],
});

router.beforeEach((to, from, next) => {
  //   if (to !== "login") {
  //     return next();
  //   }
  console.log(to);
  next();
});

export default router;
