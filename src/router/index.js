import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Number from "../views/number.vue";
import Login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    name:"home",
    component:Home
  },
  {
    path:"/number",
    name:"number",
    component:Number
  },
  {
    path:"/login",
    name:"login",
    component:Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
